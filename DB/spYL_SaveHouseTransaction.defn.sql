/* ---------------------------------------------------
spYL_SaveHouseTransaction (SQL_STORED_PROCEDURE)
Description: 
Usage remarks / example: 
---------------------------------------------------*/
BEGIN TRY DROP PROCEDURE [dbo].[spYL_SaveHouseTransaction] END TRY BEGIN CATCH END CATCH
GO
CREATE PROCEDURE [dbo].[spYL_SaveHouseTransaction]
(@ID NVARCHAR(50),@JYLX nvarchar(50),@HousesType nvarchar(50),@FCZJ nvarchar(30),@FirstPayment NVARCHAR(20),@FCDK nvarchar(30),@FCHU1 nvarchar(30),@FCHU2 nvarchar(30),
@FCHU3 nvarchar(30),@FCMJ nvarchar(30),@SZLC nvarchar(30),@GYLC nvarchar(30),@JZNF nvarchar(30),@MSF nvarchar(30),
@ZXYQ nvarchar(30),@FWCX nvarchar(30),@XQXZ nvarchar(30),@XQDZ nvarchar(800),@FCTS nvarchar(300),@FXBT nvarchar(800),
@FXMS nvarchar(max),@Picture NVARCHAR(max),@PictureGUID NVARCHAR(max), @ZDTJ nvarchar(10),@UnitPrice NVARCHAR(20),
@CoreSellingPoint NVARCHAR(max),@OwnerMentality NVARCHAR(max),@VillageMatch NVARCHAR(max),@ServiceIntroduction NVARCHAR(max),
@LoginID int,@Success bit OUTPUT,@RetMsg nvarchar(max) output,@OrderID nvarchar(50) output)
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
				 ,FCTS =@FCTS ,FXBT =@FXBT ,FXMS = @FXMS,XXLH=@ZDTJ,UDF1=CASE WHEN TRY_CONVERT(INT,@ZDTJ)>0 THEN '1' ELSE '0' END,UDF2=@UnitPrice,
				 FirstPayment=@FirstPayment,CoreSellingPoint=@CoreSellingPoint,OwnerMentality=@OwnerMentality,VillageMatch=@VillageMatch,
			     ServiceIntroduction= @ServiceIntroduction, ModifiedBy =@LoginID,ModifiedDate = GETDATE() WHERE ID=@ID;
				

				IF LEN(ISNULL(@Picture,''))>0
				BEGIN
				      DELETE FROM tblYLFCImage WHERE ItemKey=@ID;

					  DECLARE @PictureTbl2 TABLE(PicName NVARCHAR(300),FLName NVARCHAR(300))
					   
					  INSERT INTO @PictureTbl2(PicName,FLName)
					  SELECT (select  dbo.fnMain_GetStrSegment(val,N'|',1)),(select  dbo.fnMain_GetStrSegment(val,N'|',2)) from dbo.tfMain_StrToTblStr(@Picture,'•')

					  INSERT INTO dbo.tblYLFCImage(ImageID,ItemKey,[FileName])
					  SELECT PicName,@ID,FLName FROM @PictureTbl2  
				END
				if len(@ZDTJ)>0
				BEGIN
				 	DECLARE @Amount2 DECIMAL(18,2)
					SELECT @Amount2= TRY_CONVERT(DECIMAL(18,2),TagData) FROM dbo.tblTicketLookup WHERE LookupCat=N'置顶推荐' AND LookupKey=@ZDTJ
		 			select @OrderID=NEWID();
		 			INSERT INTO tblYLOrderPay(ID,ProductID,OrderStatus,OrderAmount,CreateDate)
			 		VALUES(@OrderID,@ID,'P',@Amount2,GETDATE())
					--置顶更新数据
					UPDATE dbo.tblYLFCZD SET ZDTS=@ZDTJ WHERE FCID=@ID;
				
				 END
				SELECT @Success=1;
		  END
           
	END
	ELSE 
	BEGIN
		 DECLARE @CurrentID NVARCHAR(50)
		 SELECT @CurrentID= dbo.fnSF_GetNextHouseInfoID ('XXXYLZJ');

		 DECLARE @FCPublish NVARCHAR(10);
		 SELECT @FCPublish='I';
		 IF EXISTS (SELECT TOP 1 1  FROM tblSecGroupPersons WHERE LoginID=@LoginID AND SecGroupID<>(SELECT SecGroupID FROM dbo.tblSecGroups WHERE SecGroupName='Everyone'))
		 BEGIN
			SELECT @FCPublish='O';
		 END
		  INSERT INTO  dbo.tblYLHouses (ID,HousesType,JYLX,FCZJ,FCDK,FCHU1,FCHU2,FCHU3,FCMJ,SZLC,GYLC,JZNF,MSF,ZXYQ,FWCX,XQXZ,
		 XQDZ,FCTS,FXBT,FXMS,XXLH,UDF2,FirstPayment,CoreSellingPoint,OwnerMentality,VillageMatch,ServiceIntroduction,FCPublish,CreatedBy,CreatedDate,ModifiedBy,ModifiedDate)
		 VALUES (@CurrentID,@HousesType,@JYLX,@FCZJ,@FCDK,@FCHU1,@FCHU2,@FCHU3,@FCMJ,@SZLC,@GYLC,@JZNF,@MSF,@ZXYQ,@FWCX,@XQXZ,@XQDZ,
		 @FCTS,@FXBT,@FXMS,@ZDTJ,@UnitPrice,@FirstPayment,@CoreSellingPoint,@OwnerMentality,@VillageMatch,@ServiceIntroduction,@FCPublish,
		 @LoginID,GETDATE(),@LoginID,GETDATE())
		 IF LEN(ISNULL(@Picture,''))>0
		 BEGIN
			  DECLARE @PictureTbl TABLE(PicName NVARCHAR(300),FLName NVARCHAR(300))
			   
			  INSERT INTO @PictureTbl(PicName,FLName)
			  SELECT (select  dbo.fnMain_GetStrSegment(val,N'|',1)),(select  dbo.fnMain_GetStrSegment(val,N'|',2)) from dbo.tfMain_StrToTblStr(@Picture,'•')

			  INSERT INTO dbo.tblYLFCImage(ImageID,ItemKey,[FileName])
			  SELECT PicName,@CurrentID,FLName FROM @PictureTbl P INNER JOIN (SELECT val from dbo.tfMain_StrToTblStr(@PictureGUID,'•')) T ON P.PicName=T.val
		 END
		 DECLARE @FCZD INT;

		 --订单表
		 DECLARE @Amount DECIMAL(18,2)
		 SELECT @Amount= TRY_CONVERT(DECIMAL(18,2),TagData) FROM dbo.tblTicketLookup WHERE LookupCat=N'置顶推荐' AND LookupKey=@ZDTJ
		 SELECT @OrderID=NEWID();
		 INSERT INTO tblYLOrderPay(ID,ProductID,OrderStatus,OrderAmount,CreateDate)
		 VALUES(@OrderID,@CurrentID,'P',@Amount,GETDATE())

		 INSERT INTO dbo.tblYLFCZD (InfoID,FCID,ZDTS)VALUES(NEWID(),@CurrentID,@ZDTJ)
		 
		 SELECT @Success=1;
    END
	IF @Success=0
	BEGIN
		SELECT @RetMsg=N'发生错误，请联系管理员！';
	END
END
GO
