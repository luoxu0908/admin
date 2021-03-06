﻿/* ---------------------------------------------------
spYL_SaveRegFormSignup (SQL_STORED_PROCEDURE)
Description: 
Usage remarks / example: 
---------------------------------------------------*/
BEGIN TRY DROP PROCEDURE [dbo].[spYL_SaveRegFormSignup] END TRY BEGIN CATCH END CATCH
GO
CREATE PROCEDURE [dbo].[spYL_SaveRegFormSignup]
(@UserName NVARCHAR(150), @Mobile NVARCHAR(150),@Pwd NVARCHAR(150),@LoginID INT,@Success BIT OUTPUT, @RetMsg nvarchar(500) OUTPUT )
AS
BEGIN
	SET NOCOUNT ON;
	SET DATEFORMAT dmy;
	
	DECLARE @RoleID INT, @PersonID INT, @EntityCreated BIT, @LoginCreated BIT, @NewLoginID INT, @PasswordIfLoginCreated NVARCHAR(50),@SuccessSub BIT;
	SELECT @EntityCreated=0, @LoginCreated=0, @PersonID=0, @RoleID=0, @LoginID=0,@PasswordIfLoginCreated='';
	SELECT @Success=0, @RetMsg='';


	IF NOT EXISTS(SELECT TOP 1 1 FROM dbo.tblCtcPersons WHERE EntityKey=@Mobile ) 
	BEGIN
	
		EXEC [dbo].[spCtc_CreateNewEntity] 'I', @UserName, @Mobile, '', 0, @LoginID, @PersonID OUTPUT, @RoleID OUTPUT, @SuccessSub OUTPUT, @RetMsg OUTPUT;
		IF NOT @SuccessSub<>0
		BEGIN IF LEN(@RetMsg)=0 SET @RetMsg = N'创建失败请联系管理员!'; RETURN; END

		EXEC [dbo].[spSec_CreateNewLogin] @Mobile, @UserName, N'A', @Pwd, '', @LoginID OUTPUT, @PasswordIfLoginCreated OUTPUT, @RetMsg OUTPUT;
		UPDATE dbo.tblCtcPersons SET LoginID=@LoginID WHERE PersonID=@PersonID;
		UPDATE dbo.tblCtcRoles SET Tel1=@Mobile,Mobile=@Mobile,Tel2=@Mobile WHERE PersonID=@PersonID
		 
	END
	ELSE IF  EXISTS (SELECT TOP 1 1 FROM dbo.tblCtcPersons WHERE EntityKey=@Mobile AND ISNULL(LoginID,0)=0)
	BEGIN
	    SELECT @PersonID=PersonID FROM dbo.tblCtcPersons WHERE EntityKey=@Mobile
		EXEC [dbo].[spSec_CreateNewLogin] @Mobile, @UserName, N'A', @Pwd, '', @LoginID OUTPUT, @PasswordIfLoginCreated OUTPUT, @RetMsg OUTPUT;
	 	UPDATE dbo.tblCtcPersons SET LoginID=@LoginID WHERE PersonID=@PersonID;
		UPDATE dbo.tblCtcRoles SET Tel1=@Mobile,Mobile=@Mobile,Tel2=@Mobile WHERE PersonID=@PersonID
	END
	ELSE 
    BEGIN
		 SELECT @RetMsg=N'手机号码已存在!';
	END
	
	IF LEN(@RetMsg)=0 BEGIN SET @Success=1;END
END
GO