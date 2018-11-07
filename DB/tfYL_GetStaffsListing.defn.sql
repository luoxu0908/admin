/* ---------------------------------------------------
[tfYL_GetStaffsListing] (SQL_TABLE_VALUED_FUNCTION)
Description: 
Usage remarks / example: 
---------------------------------------------------*/
BEGIN TRY DROP FUNCTION [dbo].[tfYL_GetStaffsListing] END TRY BEGIN CATCH END CATCH
GO
CREATE FUNCTION [dbo].[tfYL_GetStaffsListing]( @GroupID  int)
RETURNS @OutputTable TABLE ( PersonID int, [DisplayName] nvarchar(150),RoleName nvarchar(150), RoleID INT,LoginID INT,Mobile nvarchar(50) )
AS
BEGIN
	INSERT INTO @OutputTable  select  DISTINCT PersonID,DisplayName, (case when TagName LIKE '%Staff IC%' THEN N'管理员' ELSE N'员工' END ) AS RoleName,PR.RoleID,LoginID,Mobile from tblCtcRoleTags  RT INNER JOIN vwCtcPRoles PR on rt.RoleID=PR.RoleID where TagName in (select TagName from tblCtcGroupRoles where GroupID=@GroupID AND TagName NOT LIKE '%Staff Admin%')
	RETURN;
END
GO