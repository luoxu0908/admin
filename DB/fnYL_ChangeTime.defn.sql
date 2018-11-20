/* ---------------------------------------------------
fnYL_ChangeTime (SQL_SCALAR_FUNCTION)
Description:
Usage remarks / example: 
---------------------------------------------------*/
BEGIN TRY DROP FUNCTION [dbo].[fnYL_ChangeTime] END TRY BEGIN CATCH END CATCH
GO
CREATE FUNCTION [dbo].[fnYL_ChangeTime]
(@Str nvarchar(50))
RETURNS DATETIME 
AS
BEGIN
	  DECLARE @Day1 NVARCHAR(20),@Year1 NVARCHAR(20),@Month1 NVARCHAR(20)
	  DECLARE @Result DATETIME;
	  IF LEN(TRIM(ISNULL(@Str,'')))>0
	  BEGIN
			  SELECT @Year1=RIGHT(@Str,4)
			  SELECT @Day1=LEFT(@Str,2);
			  SELECT @Month1=RIGHT(@Str,LEN(@Str)-2)
			  SELECT @Month1=TRIM(LEFT(@Month1,LEN(@Month1)-4));
			  SELECT @Month1=CASE WHEN @Month1=N'一月' THEN '01' WHEN @Month1=N'二月' THEN '02' WHEN @Month1=N'三月' THEN '03' 
			  WHEN @Month1=N'四月' THEN '04'
			  WHEN @Month1=N'五月' THEN '05' WHEN @Month1=N'六月' THEN '06' WHEN @Month1=N'七月' THEN '07' WHEN @Month1=N'八月' THEN '08' 
			  WHEN @Month1=N'九月' THEN '09' WHEN @Month1=N'十月' THEN '10' WHEN @Month1=N'十一月' THEN '11' WHEN @Month1=N'十二月' THEN '12'
			  ELSE '' END  
			  SELECT @Result=CONVERT(DATETIME,@Year1+'-'+@Month1+'-'+@Day1)
	  END
	  ELSE
      BEGIN
		  SELECT  @Result=GETDATE()
      END
	  
	RETURN @Result;
END
GO