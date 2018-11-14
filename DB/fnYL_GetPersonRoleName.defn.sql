/* ---------------------------------------------------
fnYL_GetPersonRoleName (SQL_SCALAR_FUNCTION)
Description: 
Usage remarks / example: 
---------------------------------------------------*/
BEGIN TRY DROP FUNCTION [dbo].[fnYL_GetPersonRoleName] END TRY BEGIN CATCH END CATCH
GO
CREATE FUNCTION [dbo].[fnYL_GetPersonRoleName](@RoleID int, @GroupID integer)

RETURNS nvarchar(max)
AS
BEGIN
	DECLARE @DisplayName nvarchar(max);
	SELECT @DisplayName = COALESCE(@DisplayName+ N' ,', N'') + CASE WHEN RoleName='Staff IC' THEN N'管理员' ELSE N'员工' END 
	FROM vwCtcPRoles R INNER JOIN tblCtcRoleTags a ON R.RoleID=a.RoleID INNER JOIN tblCtcGroupRoles b ON a.TagName = b.TagName
	AND (b.GroupID = @GroupID OR @GroupID IS NULL) AND a.RoleID=@RoleID;
	RETURN @DisplayName;
END
GO



