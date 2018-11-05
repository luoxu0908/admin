/* ---------------------------------------------------
fnYL_GetFCTS (SQL_SCALAR_FUNCTION)
Description:
Usage remarks / example: 
---------------------------------------------------*/
BEGIN TRY DROP FUNCTION [dbo].[fnYL_GetFCTS] END TRY BEGIN CATCH END CATCH
GO
CREATE FUNCTION [dbo].[fnYL_GetFCTS](@FCTS nvarchar(300))
RETURNS nvarchar(100)
AS
BEGIN
	DECLARE @Temp TABLE (LookKey NVARCHAR(10));
	DECLARE @FCHX nvarchar(max);
	IF LEN(ISNULL(@FCTS,''))>0
	BEGIN
		SELECT @FCHX=ISNULL(@FCHX,'') + ISNULL(TL.Description,'')+',' FROM (SELECT Val FROM tfMain_StrToTblStr (@FCTS,'•')) T LEFT JOIN tblTicketLookup TL ON  TL.LookupKey=T.Val  WHERE  TL.LookupCat=N'房屋特色'
		SELECT @FCHX=LEFT(@FCHX,LEN(@FCHX)-1);
	END
	RETURN ISNULL(@FCHX,'');
END
GO