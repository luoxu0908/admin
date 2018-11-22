/* ---------------------------------------------------
fnYL_GetFCTS (SQL_SCALAR_FUNCTION)
Description:
Usage remarks / example: 
---------------------------------------------------*/
BEGIN TRY DROP FUNCTION [dbo].[fnYL_GetFCTS] END TRY BEGIN CATCH END CATCH
GO
CREATE FUNCTION [dbo].[fnYL_GetFCTS](@FCTS nvarchar(300),@JYLX NVARCHAR(20))
RETURNS nvarchar(100)
AS
BEGIN
	DECLARE @Temp TABLE (LookKey NVARCHAR(10));
	DECLARE @FCHX nvarchar(max);
	IF LEN(ISNULL(@FCTS,''))>0
	BEGIN
		SELECT @FCHX=ISNULL(@FCHX,'') + ISNULL(TL.Val,'')+',' FROM (SELECT Val FROM tfMain_StrToTblStr (@FCTS,'•')) TL
		SELECT @FCHX=LEFT(@FCHX,LEN(@FCHX)-1);
	END
	RETURN ISNULL(@FCHX,'');
END
GO