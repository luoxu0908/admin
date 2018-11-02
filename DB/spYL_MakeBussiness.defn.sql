/* ---------------------------------------------------
spYL_MakeBussiness (SQL_STORED_PROCEDURE)
Description: 
Usage remarks / example: 
---------------------------------------------------*/
BEGIN TRY DROP PROCEDURE [dbo].[spYL_MakeBussiness] END TRY BEGIN CATCH END CATCH
GO
CREATE PROCEDURE [dbo].[spYL_MakeBussiness]
( @RowID nvarchar(max),@LoginID int,@Success bit OUTPUT,@RetMsg nvarchar(max) output  )
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @GroupName NVARCHAR(150),@GroupID NVARCHAR(100),@RoleID INT,@TagName NVARCHAR(150),@ChildLabel NVARCHAR(max);
	SELECT @Success =0,@RetMsg='';
	SELECT @GroupName=OtherName,@RoleID=DefaultRoleID FROM dbo.tblCtcPersons WHERE PersonID=@RowID;
	SELECT @ChildLabel=ChildLabel from dbo.tblCtcGroupHierarchy WHERE ParentGroupID=1 AND ChildGroupID=2;
	SELECT @ChildLabel=@ChildLabel+'/'+@GroupName;

	IF EXISTS(SELECT TOP 1 1 FROM dbo.tblCtcGroups WHERE GroupName=@GroupName) BEGIN SELECT  @RetMsg=N'店铺名已存在，无法创建！';RETURN; END

	INSERT INTO dbo.tblCtcGroups( GroupName , GroupType ,CustomGroupDataTable ,InfoID ,CreatedBy ,CreatedDate)
	VALUES  ( @GroupName ,N'Group' ,N'' ,  0 ,  1 , GETDATE());
	SELECT @GroupID=SCOPE_IDENTITY();
    
	INSERT INTO dbo.tblCtcGroupsLayout ( ParentGroupID ,ChildGroupID ,Matrix ,CreatedBy ,CreatedDate )
	VALUES  ( 1 , @GroupID , 2 , 1 , GETDATE())
	INSERT INTO dbo.tblCtcGroupsLayout ( ParentGroupID ,ChildGroupID ,Matrix ,CreatedBy ,CreatedDate )
	VALUES  ( 2 ,@GroupID, 1 , 1 , GETDATE())
	INSERT INTO dbo.tblCtcGroupsLayout ( ParentGroupID ,ChildGroupID ,Matrix ,CreatedBy ,CreatedDate )
	VALUES  ( 5 , @GroupID ,0 , 1 , GETDATE())

	INSERT INTO dbo.tblCtcGroupHierarchy( ParentGroupID ,ChildGroupID , ChildLabel)
	VALUES  ( 2 , @GroupID , @ChildLabel)

    SELECT @TagName='GroupID.'+@GroupID+'(Staff IC)';
	INSERT INTO dbo.tblCtcGroupRoles (TagName ,GroupID ,RoleName ,GroupRoleBitMask ,GroupDepthAccess , CreatedBy ,CreatedDate )
	VALUES  ( @TagName, @GroupID,N'Staff IC' ,0 , 0 , @LoginID , GETDATE())

	INSERT INTO dbo.tblCtcGroupRoles (TagName ,GroupID ,RoleName ,GroupRoleBitMask ,GroupDepthAccess , CreatedBy ,CreatedDate )
	VALUES  ( 'GroupID.'+@GroupID+'(Staff)', @GroupID,N'Staff IC' ,0 , 0 , @LoginID , GETDATE())

	INSERT INTO dbo.tblCtcTagNamesSecurityMod  ( TagName, SecGroupID )VALUES	(@TagName,10)

	INSERT INTO dbo.tblCtcTagNamesSecurityMod ( TagName, SecGroupID ) VALUES	(@TagName,13)

	
	EXEC [dbo].[spCtc_RoleTag_Upsert] @RoleID,@TagName,@LoginID, 0, 1, 1, N'';

	UPDATE dbo.tblCtcPersons SET Status=N'已通过' WHERE PersonID=@RowID;

	IF	@@ROWCOUNT>0 BEGIN SELECT @Success =1,@RetMsg=''; END
	ELSE SELECT @RetMsg=N'发生错误，请联系管理员！';
END
GO

