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
@FXMS nvarchar(max),@ZDTJ nvarchar(10),@LoginID int,@Success bit OUTPUT,@RetMsg nvarchar(max) output)
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
				 ,FCTS =@FCTS ,FXBT =@FXBT ,FXMS = @FXMS,XXLH=@ZDTJ,ModifiedBy =@LoginID,ModifiedDate = GETDATE() WHERE ID=@ID;
				 SELECT @Success=1;
		  END
           
	END
	ELSE 
	BEGIN
		 DECLARE @CurrentID NVARCHAR(50)
		 SELECT @CurrentID= dbo.fnSF_GetNextHouseInfoID ('FL');
		 INSERT INTO  dbo.tblYLHouses (ID,HousesType,JYLX,FCZJ,FCDK,FCHU1,FCHU2,FCHU3,FCMJ,SZLC,GYLC,JZNF,MSF,ZXYQ,FWCX,XQXZ,
		 XQDZ,FCTS,FXBT,FXMS,XXLH,CreatedBy,CreatedDate,ModifiedBy,ModifiedDate)
		 VALUES (@CurrentID,@HousesType,@JYLX,@FCZJ,@FCDK,@FCHU1,@FCHU2,@FCHU3,@FCMJ,@SZLC,@GYLC,@JZNF,@MSF,@ZXYQ,@FWCX,@XQXZ,@XQDZ,
		 @FCTS,@FXBT,@FXMS,@ZDTJ,@LoginID,GETDATE(),@LoginID,GETDATE())
		 SELECT @Success=1;
    END
	IF @Success=0
	BEGIN
		SELECT @RetMsg=N'发生错误，请联系管理员！';
	END
END
GO