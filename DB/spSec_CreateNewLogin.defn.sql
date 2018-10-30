/* ---------------------------------------------------
spSec_CreateNewLogin (SQL_STORED_PROCEDURE)
Description: Create a new user
Usage remarks / example:
DECLARE @LoginID int, @PasswordSet nvarchar(200), @RetMsg nvarchar(max);
EXEC [dbo].[spSec_CreateNewLogin] 'Username', 'Display Name', 'A', 'p@ssw0rd', '', @LoginID OUTPUT, @PasswordSet OUTPUT, @RetMsg OUTPUT;
SELECT @LoginID AS LoginID, @PasswordSet AS PasswordSet, @RetMsg AS RetMsg;
---------------------------------------------------*/
BEGIN TRY DROP PROCEDURE [dbo].[spSec_CreateNewLogin] END TRY BEGIN CATCH END CATCH
GO
CREATE PROCEDURE [dbo].[spSec_CreateNewLogin] ( @Username nvarchar(150), @DispName nvarchar(150), @Status varchar(1), @Password nvarchar(200), @EnhSecMobile nvarchar(30), @LoginID int OUTPUT, @PasswordSet nvarchar(200) OUTPUT, @RetMsg nvarchar(max) OUTPUT)
AS
BEGIN
	SET NOCOUNT ON;
	--, ByVal Status As String, ByVal Password As String, ByVal EnhSecMobile As String
	SELECT @LoginID=0, @PasswordSet='', @RetMsg='', @Username=ISNULL(@Username,N''), @DispName=ISNULL(@DispName,N''), @Status=ISNULL(@Status,N''), @Password=ISNULL(@Password,N''), @EnhSecMobile=ISNULL(@EnhSecMobile,N'');

	IF NOT (SELECT dbo.fnSec_ChkIsValidUsername (@Username, NULL)) <> 0 --Valid username
	BEGIN SET @RetMsg='Invalid username - Username already in use or reserved'; RETURN; END;

	IF LEN(@DispName)=0 SET @DispName=@Username;
	IF LEN(@Status)=0 SET @Status='A';

	IF LEN(@Password)=0 
	BEGIN
		SET @Password=dbo.fnSec_GenRandomPassword(NULL,NULL); --Provide a random password
	END ELSE BEGIN --We only check user provided passwords
		DECLARE @Success bit; 
		EXEC dbo.spSec_CheckPwdComplexity NULL, @Username, @Password, NULL, @Success OUTPUT, @RetMsg OUTPUT; 
		IF NOT ISNULL(@Success,0)<>0 RETURN;
	END

	INSERT INTO tblSecLogins (UserName, DispName, Status, EnhSecMobile) 
	VALUES (@Username, @DispName, @Status, @EnhSecMobile); 
	SET @LoginID=ISNULL(SCOPE_IDENTITY(),0); 
	IF NOT ISNULL(@LoginID,0)>0 --Big problem
	BEGIN SET @RetMsg='Could not insert tblSecLogins - please check with support!'; RETURN; END

	SET @Success=0;
	EXEC dbo.spSec_SetUserPwd @LoginID, @Username, @Password, NULL, NULL, @Success OUTPUT, @RetMsg OUTPUT;
	IF NOT ISNULL(@Success,0)<>0 
	BEGIN SET @RetMsg=N'Could not set password - please check with support! (Reason:' + @RetMsg + N')';  RETURN; END
	SET @PasswordSet=@Password; --Successfully set password

	--Add to everyone group
	DECLARE @EveryoneSecGroupID int; SET @EveryoneSecGroupID=[dbo].[fnSec_GetGroup_Everyone]();
	IF @EveryoneSecGroupID>0 EXEC [dbo].[spSec_UpsertUserToSecGroup] @LoginID, @EveryoneSecGroupID;
END
GO