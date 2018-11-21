/* ---------------------------------------------------
[spYL_FCPriceMonthlyListing_UpdRowFld] (SQL_STORED_PROCEDURE)
Description: Simple field update returns only @Success & @RetMsg
Usage remarks / example: 
---------------------------------------------------*/
BEGIN TRY DROP PROCEDURE [dbo].[spYL_FCPriceMonthlyListing_UpdRowFld] END TRY BEGIN CATCH END CATCH
GO
CREATE PROCEDURE [dbo].[spYL_FCPriceMonthlyListing_UpdRowFld]
( @RowID nvarchar(50), @FldName nvarchar(75), @FldVal nvarchar(max), @LoginID int, @Success bit OUTPUT, @RetMsg nvarchar(800) OUTPUT )
AS
BEGIN
	SET NOCOUNT ON;
	SELECT @Success=0, @RetMsg='';

	DECLARE @VillageKey NVARCHAR(200),@PartYear NVARCHAR(10),@VillageText NVARCHAR(500);
		IF @FldName='VillageKey'
			BEGIN 
				SELECT  @PartYear=PartYear FROM tblYLFCPriceMonthlySummary WHERE ID=@RowID
				IF NOT EXISTS(SELECT TOP 1 1 FROM tblYLFCPriceMonthlySummary WHERE VillageKey=@FldVal AND PartYear=@PartYear)
				BEGIN
					UPDATE tblYLFCPriceMonthlySummary SET VillageKey=@FldVal WHERE ID=@RowID;
				END	
				ELSE 
				BEGIN
					   SELECT @VillageText=Description FROM dbo.tblTicketLookup WHERE LookupCat=N'小区名称' AND LookupKey=@FldVal
					   SELECT @Success=1,@RetMsg=@VillageText+N' '+@PartYear+N' 年数据已存在.';
					   RETURN;
				END 
				
			END
		ELSE IF @FldName='PartYear'
			 BEGIN
				SELECT  @VillageKey=VillageKey FROM tblYLFCPriceMonthlySummary WHERE ID=@RowID
				IF NOT EXISTS(SELECT TOP 1 1 FROM tblYLFCPriceMonthlySummary WHERE PartYear=@FldVal AND VillageKey=@VillageKey)
				BEGIN
					UPDATE tblYLFCPriceMonthlySummary SET PartYear=@FldVal WHERE ID=@RowID;
				END	
				ELSE 
				BEGIN
					   SELECT @VillageText=Description FROM dbo.tblTicketLookup WHERE LookupCat=N'小区名称' AND LookupKey=@VillageKey
					   SELECT @Success=1,@RetMsg=@VillageText+N' '+@FldVal+N' 年数据已存在.';
					   RETURN ;
				END 
				
			 END
		ELSE IF @FldName='Janurary'
			BEGIN
				  UPDATE tblYLFCPriceMonthlySummary SET Janurary=@FldVal WHERE ID=@RowID;
			END
		ELSE IF @FldName='February'
			BEGIN
				  UPDATE tblYLFCPriceMonthlySummary SET February=@FldVal WHERE ID=@RowID;
			END
		ELSE IF @FldName='March'
			BEGIN
				  UPDATE tblYLFCPriceMonthlySummary SET March=@FldVal WHERE ID=@RowID;
			END
		ELSE IF @FldName='April'
			BEGIN
				  UPDATE tblYLFCPriceMonthlySummary SET April=@FldVal WHERE ID=@RowID;
			END
		ELSE IF @FldName='May'
			BEGIN
				  UPDATE tblYLFCPriceMonthlySummary SET May=@FldVal WHERE ID=@RowID;
			END
		ELSE IF @FldName='June'
			BEGIN
				  UPDATE tblYLFCPriceMonthlySummary SET June=@FldVal WHERE ID=@RowID;
			END
		ELSE IF @FldName='July'
			BEGIN
				  UPDATE tblYLFCPriceMonthlySummary SET July=@FldVal WHERE ID=@RowID;
			END
		ELSE IF @FldName='August'
			BEGIN
				  UPDATE tblYLFCPriceMonthlySummary SET August=@FldVal WHERE ID=@RowID;
			END
		ELSE IF @FldName='September'
			BEGIN
				  UPDATE tblYLFCPriceMonthlySummary SET September=@FldVal WHERE ID=@RowID;
			END
		ELSE IF @FldName='October'
			BEGIN
				  UPDATE tblYLFCPriceMonthlySummary SET October=@FldVal WHERE ID=@RowID;
			END
		ELSE IF @FldName='November'
			BEGIN
				  UPDATE tblYLFCPriceMonthlySummary SET November=@FldVal WHERE ID=@RowID;
			END
		ELSE IF @FldName='December'
			BEGIN
				  UPDATE tblYLFCPriceMonthlySummary SET December=@FldVal WHERE ID=@RowID;
			END
		IF len (@RetMsg)=0
		BEGIN 
			SELECT 1 AS Success,'' AS DelIDs,'' AS RetMsg;
			SELECT FM.ID,TL.Description AS VillageKey,FM.PartYear,FM.Janurary,FM.February,FM.March,
			FM.April,FM.May,FM.June,FM.July,FM.August,FM.September,FM.October,FM.November,FM.December,
			CP1.DisplayName AS CreatedBy,(SELECT CONVERT(nvarchar(10), FM.CreatedDate, 121)) AS CreatedDate,CP2.DisplayName AS ModifiedBy,
			(SELECT CONVERT(nvarchar(10), FM.ModifiedDate, 121)) AS ModifiedDate
			  FROM tblYLFCPriceMonthlySummary FM
			LEFT JOIN tblTicketLookup TL ON FM.VillageKey=TL.LookupKey AND TL.LookupCat=N'小区名称'
			LEFT JOIN dbo.tblCtcPersons CP1 ON CP1.LoginID=FM.CreatedBy
			LEFT JOIN dbo.tblCtcPersons CP2 ON CP2.LoginID=FM.ModifiedBy
			WHERE  FM.ID=@RowID;
		END
		
END
GO