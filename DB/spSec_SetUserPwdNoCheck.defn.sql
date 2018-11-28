/* ---------------------------------------------------
spSec_SetUserPwdNoCheck (SQL_STORED_PROCEDURE)
Description: Sets a user password No validation of password complexity etc.
Usage remarks / example: IF @PwdHashVer & @PwdHashCnt ARE NULL, will take defaults
DECLARE @Success bit, @RetMsg nvarchar(500);
EXEC dbo.spSec_SetUserPwdNoCheck @LoginID, NULL, 'my_p@ssw0rd_here!', NULL, NULL, @Success OUTPUT, @RetMsg OUTPUT;
SELECT @Success AS Success, @RetMsg AS RetMsg;
---------------------------------------------------*/
BEGIN TRY DROP PROCEDURE [dbo].[spSec_SetUserPwdNoCheck] END TRY BEGIN CATCH END CATCH
GO
CREATE PROCEDURE [dbo].[spSec_SetUserPwdNoCheck] (@LoginID int, @ChangeUsername nvarchar(150), @Password nvarchar(200), @PwdHashVer nvarchar(10), @PwdHashCnt int, @Success bit OUTPUT, @RetMsg nvarchar(500) OUTPUT)
AS
BEGIN
	SET NOCOUNT ON;
	SELECT @Success=0, @RetMsg='';
	DECLARE @CurUsername nvarchar(100);
	IF ISNULL(@LoginID,0) <= 0 
	BEGIN SET @RetMsg=N'修改密码时请指定LoginID.'; PRINT @RetMsg; RETURN; END;
	SELECT @CurUsername=UserName FROM tblSecLogins WHERE LoginID=@LoginID;
	IF LEN(ISNULL(@ChangeUsername,'')) = 0 SET @ChangeUsername=@CurUsername;
	IF LEN(ISNULL(@ChangeUsername,'')) = 0 OR LEN(ISNULL(@CurUsername,'')) = 0
	BEGIN SET @RetMsg=N'非法的 LoginID.'; PRINT @RetMsg; RETURN; END;
	IF CHARINDEX('--',@ChangeUsername)>0 OR CHARINDEX('[',@ChangeUsername)>0 OR CHARINDEX(']',@ChangeUsername)>0 
	BEGIN SET @RetMsg=N'非法的用户名.'; PRINT @RetMsg; RETURN; END;
	IF EXISTS (SELECT TOP 1 LoginID FROM tblSecLogins WHERE (UserName=@ChangeUsername) AND (LoginID<>@LoginID) UNION SELECT TOP 1 SecGroupID FROM tblSecGroups WHERE (SecGroupName=@ChangeUsername))
	BEGIN SET @RetMsg=N'非法的用户名 - 用户名已经存在或者被使用.'; PRINT @RetMsg; RETURN; END;

	DECLARE @Result varbinary(128);
	IF LEN(ISNULL(@PwdHashVer,''))=0 SET @PwdHashVer='SHA1';
	SET @PwdHashCnt=ISNULL(@PwdHashCnt,3); --new defaults
	SELECT @Result=dbo.fnSec_GetUserPwd (@ChangeUsername, @Password, @PwdHashVer, @PwdHashCnt);

	IF LEN(@Result)>0
	BEGIN
		--Save previous passwords to block using same password twice
		IF NOT OBJECT_ID('tblSecPrevPwds') IS NULL
		BEGIN INSERT INTO tblSecPrevPwds (OldPwd) SELECT Pwd FROM tblSecLogins WHERE (LoginID=@LoginID) AND (Pwd IS NOT NULL) AND (Pwd NOT IN (SELECT OldPwd FROM tblSecPrevPwds)); END
		--Update actual table
		DECLARE @PwdResetReminderDays int, @PwdExpiresDurationDays int, @EnhSec bit;
		SELECT @PwdResetReminderDays=LTRIM(RTRIM(LookupValue)) FROM tblSecLookup WHERE LookupCat=N'Config' AND LookupKey=N'PwdResetReminderDays' AND ISNUMERIC(LTRIM(RTRIM(LookupValue)))=1;
		SELECT @PwdExpiresDurationDays=LTRIM(RTRIM(LookupValue)) FROM tblSecLookup WHERE LookupCat=N'Config' AND LookupKey=N'PwdExpiresDurationDays' AND ISNUMERIC(LTRIM(RTRIM(LookupValue)))=1;
		SELECT @PwdResetReminderDays=ISNULL(@PwdResetReminderDays,0), @PwdExpiresDurationDays=ISNULL(@PwdExpiresDurationDays,0), @EnhSec=ISNULL([dbo].[fnSec_GetEnhancedSecurity](@LoginID),1);
		UPDATE tblSecLogins SET Username=@ChangeUsername,Pwd=@Result,PwdHashVer=@PwdHashVer,PwdHashCnt=@PwdHashCnt, LastPwdChangeOn=GETDATE()
		, ChangePwdOn=CASE WHEN @PwdResetReminderDays>0 AND @EnhSec<>0 THEN DATEADD(DAY, @PwdResetReminderDays, GETDATE()) ELSE ChangePwdOn END
		, ExpiresOn=CASE WHEN @PwdExpiresDurationDays>0 AND @EnhSec<>0 THEN DATEADD(DAY, @PwdExpiresDurationDays, GETDATE()) ELSE ExpiresOn END
		WHERE LoginID=@LoginID;
		IF @@ROWCOUNT=1 SET @Success=1;
	END 
	ELSE BEGIN
		SET @RetMsg='Err calling dbo.fnSec_GetUserPwd (from dbo.spSec_SetUserPwdNoCheck)'; PRINT @RetMsg; RETURN; 
	END
	IF LEN(@RetMsg)>0 PRINT @RetMsg; 
END
GO