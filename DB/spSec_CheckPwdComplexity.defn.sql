/* ---------------------------------------------------
spSec_CheckPwdComplexity (SQL_STORED_PROCEDURE)
Description: Called by spSec_SetUserPwd
Usage remarks / example:
DECLARE @Success bit, @RetMsg nvarchar(500);
EXEC dbo.spSec_CheckPwdComplexity 1, 'Admin', 'NewPassword123', NULL, @Success OUTPUT, @RetMsg OUTPUT;
SELECT @Success AS Success, @RetMsg AS RetMsg;
---------------------------------------------------*/
BEGIN TRY DROP PROCEDURE [dbo].[spSec_CheckPwdComplexity] END TRY BEGIN CATCH END CATCH
GO
CREATE PROCEDURE [dbo].[spSec_CheckPwdComplexity] (@ChkDoneByLoginID int, @Username nvarchar(100), @Password nvarchar(200), @NewPwdHash varbinary(128), @Success bit OUTPUT, @RetMsg nvarchar(500) OUTPUT)
AS
BEGIN
	SET NOCOUNT ON;
	SELECT @Success=0, @RetMsg='';

	IF LEN(@Password)<8
	BEGIN
		SET @RetMsg=N'密码至少为8位！'; RETURN;
	END 

	IF CHARINDEX(@Username, @Password)>0
	BEGIN
		SET @RetMsg=N'密码不能包含用户名！'; RETURN;
	END 
	IF CHARINDEX(@Password, @Username)>0
	BEGIN
		SET @RetMsg=N'用户名不能包含密码！'; RETURN;
	END
	--Do not allow previous passwords to be used
	IF (NOT OBJECT_ID('tblSecPrevPwds！') IS NULL)
	BEGIN
		IF @NewPwdHash IS NULL SET @NewPwdHash=dbo.fnSec_GetUserPwd (@Username, @Password, 'SHA1', 3); --Try checking using default settings
		IF EXISTS(SELECT TOP 1 1 FROM tblSecPrevPwds WHERE OldPwd=@NewPwdHash) OR EXISTS(SELECT TOP 1 1 FROM tblSecLogins WHERE Pwd=@NewPwdHash AND Username=@Username)
		BEGIN
			SET @RetMsg=N'不能设置以前用过的密码,请输入新密码！'; RETURN;
		END
	END
	SET @Success=1;
	RETURN;
END
GO