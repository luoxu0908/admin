/* ---------------------------------------------------
[tfYL_GetStaffsListing] (SQL_TABLE_VALUED_FUNCTION)
Description: 
Usage remarks / example: 
---------------------------------------------------*/
BEGIN TRY DROP FUNCTION [dbo].[tfYL_GetStaffsListing] END TRY BEGIN CATCH END CATCH
GO
CREATE FUNCTION [dbo].[tfYL_GetStaffsListing]( @LoginID  int)
RETURNS @OutputTable TABLE ( PersonID int, [DisplayName] nvarchar(150),RoleName nvarchar(150), RoleID INT,LoginID INT,Mobile nvarchar(50) )
AS
BEGIN
	DECLARE @GroupID INT,@TagName NVARCHAR(200);
	SELECT @TagName=TagName FROM dbo.tblCtcRoleTags WHERE RoleID IN (SELECT  DefaultRoleID FROM dbo.tblCtcPersons WHERE LoginID=@LoginID) and TagName like '%Staff IC%' order by CreatedDate 
	SELECT @GroupID=GroupID from tblCtcGroupRoles WHERE TagName=@TagName  
	
	INSERT INTO @OutputTable  select  DISTINCT PersonID,DisplayName,TagName,PR.RoleID,LoginID,Mobile from tblCtcRoleTags  RT INNER JOIN vwCtcPRoles PR on rt.RoleID=PR.RoleID where TagName in (select TagName from tblCtcGroupRoles where GroupID=@GroupID)
	
	RETURN;
END
GO