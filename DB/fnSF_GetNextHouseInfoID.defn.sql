/* ---------------------------------------------------
fnSF_GetNextHouseInfoID (SQL_SCALAR_FUNCTION)
Description:
Usage remarks / example: 
---------------------------------------------------*/
BEGIN TRY DROP FUNCTION [dbo].[fnSF_GetNextHouseInfoID] END TRY BEGIN CATCH END CATCH
GO
CREATE FUNCTION [dbo].[fnSF_GetNextHouseInfoID]
( @Type nvarchar(100) )
RETURNS nvarchar(30)
AS
BEGIN
	DECLARE @NextNo nvarchar(30), @NextCompiledNo nvarchar(30), @FinalCompiledNo nvarchar(30);
	SELECT @NextNo='', @NextCompiledNo='', @FinalCompiledNo='';

	--Get next number
	SELECT TOP 1 @NextNo = CONVERT(nvarchar(30),CONVERT(int,SUBSTRING(ID,7,99))+1) FROM tblYLHouses WHERE HousesType = @Type ORDER BY CONVERT(int,SUBSTRING(ID,7,99)) DESC;

	IF LEN(ISNULL(@NextNo,''))=0
	BEGIN
		SELECT TOP 1 @FinalCompiledNo = 'FC-'+UPPER(SUBSTRING(@Type,4,2))+'-'+'000001';
	END

	ELSE BEGIN
		IF LEN(@NextNo) = 6
		BEGIN
			SELECT @FinalCompiledNo = 'SF-'+UPPER(SUBSTRING(@Type,4,2))+'-'+@NextNo;
		END
		ELSE BEGIN
			SELECT @NextCompiledNo = REPLICATE('0',6-LEN(@NextNo)) + @NextNo;
			SELECT @FinalCompiledNo = 'SF-'+UPPER(SUBSTRING(@Type,4,2))+'-'+@NextCompiledNo;			
		END	
	END
	RETURN ISNULL(@FinalCompiledNo,'');
END
GO
