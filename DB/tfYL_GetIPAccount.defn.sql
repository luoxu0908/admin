/* ---------------------------------------------------
SELECT * FROM [dbo].[tfYL_GetIPAccount] (''); --Guest request for current month events
---------------------------------------------------*/
BEGIN TRY DROP FUNCTION [dbo].[tfYL_GetIPAccount] END TRY BEGIN CATCH END CATCH
GO
CREATE FUNCTION [dbo].[tfYL_GetIPAccount] (@TgtDate NVARCHAR(30))
RETURNS @OutputTable TABLE ( OrderNo int, DayDt smalldatetime, Number int)
AS
BEGIN
	DECLARE @Number INT,@ym NVARCHAR(6);
	IF LEN(@TgtDate)=0
	BEGIN
		SET @TgtDate= DATEADD(mm,-1,GETDATE()); --Default current month
	END
	SELECT @ym=CONVERT(varchar(6), @TgtDate, 112);
	SELECT @Number=datediff(day, cast(@ym+ '01' as datetime),dateadd(month,1,cast(@ym+ '01' as datetime)) );
	DECLARE @Dt TABLE ( DayDt smalldatetime PRIMARY KEY);
	INSERT INTO @Dt ( DayDt)
	SELECT DATEADD(day, num - 1, @TgtDate) AS DayDt FROM tfMain_GenNumberList2(31);
	INSERT INTO @OutputTable (OrderNo, DayDt, Number)
	SELECT ROW_NUMBER() over(order by DayDt),(SELECT CONVERT(nvarchar(11), DayDt, 113)),ISNULL([Count],0) FROM @Dt D
	LEFT JOIN TblYLVisit V ON  (SELECT CONVERT(nvarchar(11), V.CreatedDate, 113))=(SELECT CONVERT(nvarchar(11), D.DayDt, 113))
	RETURN;
END
GO