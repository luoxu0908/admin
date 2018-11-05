/* ---------------------------------------------------
fnYL_GetFCHX (SQL_SCALAR_FUNCTION)
Description:
Usage remarks / example: 
---------------------------------------------------*/
BEGIN TRY DROP FUNCTION [dbo].[fnYL_GetFCHX] END TRY BEGIN CATCH END CATCH
GO
CREATE FUNCTION [dbo].[fnYL_GetFCHX]
(@FCHU1 nvarchar(30),@FCHU2 nvarchar(30),@FCHU3 nvarchar(30))
RETURNS nvarchar(100)
AS
BEGIN
	DECLARE @FCHX nvarchar(100);

	IF LEN(TRIM(ISNULL(@FCHU1,'')))=0
	BEGIN
		SELECT @FCHU1=N'0 室 ';
	END
	ELSE 
	BEGIN
		SELECT @FCHU1=@FCHU1+N'室  '
    END
	IF LEN(TRIM(ISNULL(@FCHU2,'')))=0
	BEGIN
		SELECT @FCHU2=N'0 厅 ';
	END
	ELSE 
	BEGIN
		SELECT @FCHU2=@FCHU2+N' 厅 '
    END
	IF LEN(TRIM(ISNULL(@FCHU3,'')))=0
	BEGIN
		SELECT @FCHU3=N'0 卫 ';
	END
	ELSE 
	BEGIN
		SELECT @FCHU3=@FCHU3+N' 卫 '
    END
	SELECT @FCHX=@FCHU1+@FCHU2+@FCHU3;
	RETURN ISNULL(@FCHX,'');
END
GO