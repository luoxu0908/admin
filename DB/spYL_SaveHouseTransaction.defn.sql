/* ---------------------------------------------------
spYL_SaveHouseTransaction (SQL_STORED_PROCEDURE)
Description: 
Usage remarks / example: 
---------------------------------------------------*/
BEGIN TRY DROP PROCEDURE [dbo].[spYL_SaveHouseTransaction] END TRY BEGIN CATCH END CATCH
GO
CREATE PROCEDURE [dbo].[spYL_SaveHouseTransaction]
(@ID NVARCHAR(50),@JYLX nvarchar(50),@HousesType nvarchar(50),@FCZJ nvarchar(30),@FCDK nvarchar(30),@FCHU1 nvarchar(30),@FCHU2 nvarchar(30),
@FCHU3 nvarchar(30),@FCMJ nvarchar(30),@SZLC nvarchar(30),@GYLC nvarchar(30),@JZNF nvarchar(30),@MSF nvarchar(30),
@ZXYQ nvarchar(30),@FWCX nvarchar(30),@XQXZ nvarchar(30),@XQDZ nvarchar(800),@FCTS nvarchar(300),@FXBT nvarchar(800),
@FXMS nvarchar(max),@Picture NVARCHAR(max),@PictureGUID NVARCHAR(max), @ZDTJ nvarchar(10),@LoginID int,@Success bit OUTPUT,@RetMsg nvarchar(max) output)
AS
BEGIN
	SET NOCOUNT ON;
	SELECT @Success =0,@RetMsg='';
	
	IF LEN(ISNULL(@ID,''))>0
	BEGIN
		  IF EXISTS (SELECT TOP 1 1 FROM tblYLHouses WHERE ID=@ID)
		  BEGIN
				 UPDATE dbo.tblYLHouses SET HousesType =@HousesType,JYLX =@JYLX ,FCZJ =@FCZJ ,FCDK = @FCDK,FCHU1 =@FCHU1,FCHU2 =@FCHU2,FCHU3 =@FCHU3
				 ,FCMJ = @FCMJ,SZLC =@SZLC ,GYLC =@GYLC ,JZNF = @JZNF,MSF =@MSF ,ZXYQ =@ZXYQ ,FWCX = @FWCX,XQXZ =@XQXZ ,XQDZ = @XQDZ
				 ,FCTS =@FCTS ,FXBT =@FXBT ,FXMS = @FXMS,XXLH=@ZDTJ,UDF1=CASE WHEN TRY_CONVERT(INT,@ZDTJ)>0 THEN '1' ELSE '0' END,ModifiedBy =@LoginID,ModifiedDate = GETDATE() WHERE ID=@ID;
				 SELECT @Success=1;
		  END
           
	END
	ELSE 
	BEGIN
		 DECLARE @CurrentID NVARCHAR(50)
		 SELECT @CurrentID= dbo.fnSF_GetNextHouseInfoID ('XXXYLZJ');
		 INSERT INTO  dbo.tblYLHouses (ID,HousesType,JYLX,FCZJ,FCDK,FCHU1,FCHU2,FCHU3,FCMJ,SZLC,GYLC,JZNF,MSF,ZXYQ,FWCX,XQXZ,
		 XQDZ,FCTS,FXBT,FXMS,XXLH,CreatedBy,CreatedDate,ModifiedBy,ModifiedDate)
		 VALUES (@CurrentID,@HousesType,@JYLX,@FCZJ,@FCDK,@FCHU1,@FCHU2,@FCHU3,@FCMJ,@SZLC,@GYLC,@JZNF,@MSF,@ZXYQ,@FWCX,@XQXZ,@XQDZ,
		 @FCTS,@FXBT,@FXMS,(SELECT TagData FROM dbo.tblTicketLookup WHERE LookupCat=N'置顶推荐' AND LookupKey=@ZDTJ),@LoginID,GETDATE(),@LoginID,GETDATE())
		 IF LEN(ISNULL(@Picture,''))>0
		 BEGIN
			  DECLARE @PictureTbl TABLE(PicName NVARCHAR(300),FLName NVARCHAR(300))
			   
			  INSERT INTO @PictureTbl(PicName,FLName)
			  SELECT (select  dbo.fnMain_GetStrSegment(val,N'|',1)),(select  dbo.fnMain_GetStrSegment(val,N'|',2)) from dbo.tfMain_StrToTblStr(@Picture,'•')

			  INSERT INTO dbo.tblYLFCImage(ImageID,ItemKey,[FileName])
			  SELECT PicName,@CurrentID,FLName FROM @PictureTbl P INNER JOIN (SELECT val from dbo.tfMain_StrToTblStr(@PictureGUID,'•')) T ON P.PicName=T.val
		 END
		 DECLARE @FCZD INT;
		 SELECT  @FCZD=TRY_CONVERT(int,@ZDTJ)
		 IF @FCZD=1 OR @FCZD=3 OR @FCZD=7 OR  @FCZD=365
		 BEGIN 
			INSERT INTO dbo.tblYLFCZD (InfoID,FCID,ZDSJ,ZDTS)VALUES(NEWID(),@CurrentID,DATEADD(DAY,@FCZD,GETDATE()),@ZDTJ)
		 END
		 ELSE IF @FCZD=30
		 BEGIN 
			INSERT INTO dbo.tblYLFCZD (InfoID,FCID,ZDSJ,ZDTS)VALUES(NEWID(),@CurrentID,DATEADD(MONTH,1,GETDATE()),@ZDTJ)
		 END  
		 ELSE IF @FCZD=90
		 BEGIN 
			INSERT INTO dbo.tblYLFCZD (InfoID,FCID,ZDSJ,ZDTS)VALUES(NEWID(),@CurrentID,DATEADD(MONTH,3,GETDATE()),@ZDTJ)
		 END 
		 SELECT @Success=1;
    END
	IF @Success=0
	BEGIN
		SELECT @RetMsg=N'发生错误，请联系管理员！';
	END
END
GO