/* ---------------------------------------------------
spYL_MakeBussiness (SQL_STORED_PROCEDURE)
Description: 
Usage remarks / example: 
---------------------------------------------------*/
BEGIN TRY DROP PROCEDURE [dbo].[spYL_MakeBussiness] END TRY BEGIN CATCH END CATCH
GO
CREATE PROCEDURE [dbo].[spYL_MakeBussiness]
( @RowIDs nvarchar(max),@LoginID int,@Success bit OUTPUT,@RetMsg nvarchar(max) output  )
AS
BEGIN
	SET NOCOUNT ON;
	SELECT @Success =0,@RetMsg='';
	SELECT Val AS PersonID INTO #PersonTable FROM tfMain_StrToTblStr (@RowIDs,'•');
	DELETE T FROM #PersonTable T INNER JOIN tblctcpersons CP ON T.PersonID=CP.PersonID AND Status!=N'申请中'

	IF EXISTS (SELECT TOP 1 1 FROM #PersonTable)
	BEGIN
		UPDATE dbo.tblCtcPersons SET Status=N'已通过' WHERE PersonID IN (SELECT PersonID FROM #PersonTable);
		INSERT INTO dbo.tblCtcGroups( GroupName ,GroupDescription , GroupCode ,GroupType ,CreatedBy ,CreatedDate )
		SELECT OtherName,OtherName,OtherName,N'Group',@LoginID,GETDATE() FROM #PersonTable  t INNER JOIN dbo.tblCtcPersons CP ON t.PersonID=CP.PersonID
		IF	@@ROWCOUNT>0 BEGIN SELECT @Success =1,@RetMsg=''; END
		ELSE SELECT @RetMsg=N'发生错误，请联系管理员！';
	END
	ELSE
	BEGIN
		SELECT @Success =1,@RetMsg='';
	END
END
GO