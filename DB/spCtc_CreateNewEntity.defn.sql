/* ---------------------------------------------------
spCtc_CreateNewEntity (SQL_STORED_PROCEDURE)
Description: 
!!! Deprecated - please use spCtc_UpsertEntity & spCtc_IsExistingEntity (to check if entity is already in system)
Usage remarks / example: 
---------------------------------------------------*/
BEGIN TRY DROP PROCEDURE [dbo].[spCtc_CreateNewEntity] END TRY BEGIN CATCH END CATCH
GO
CREATE PROCEDURE [dbo].[spCtc_CreateNewEntity]
( @EntityType char(1), @DisplayName nvarchar(150), @EntityKey nvarchar(50)='', @RoleTags nvarchar(max)='', @Deprecated int, @DoneByLoginID int, @PersonID int OUTPUT, @RoleID int OUTPUT, @Success bit OUTPUT, @ReturnMsg nvarchar(500) OUTPUT )
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @Delimiter nvarchar(1),@CurrentPosition smallint,@TagName nvarchar(50);
	SELECT @PersonID=0, @RoleID=0, @Success=0, @ReturnMsg='';
	IF LEN(@DisplayName)=0
	BEGIN SET @ReturnMsg='用户名必须填写!'; RETURN; END
	IF NOT @EntityType IN ('I','O')
	BEGIN SET @ReturnMsg='EntityType must be I (Individual) or O (Organisation)'; RETURN; END

	-- Check duplicate using @EntityKey if LEN(@EntityKey)>5
	-- We only check if len>5 because shorter lengths are probably 'fake'
	IF LEN(ISNULL(@EntityKey,''))>5
	BEGIN --Do not create if already exists
		IF EXISTS (SELECT TOP 1 1 FROM tblCtcPersons WHERE EntityKey=@EntityKey)
		BEGIN SET @ReturnMsg='用户名已经存在!'; RETURN; END
	END
	-- Check duplicate using displayname if entitytype='O', don't need to check duplicate for person
	IF @EntityType='O'
	BEGIN
		IF EXISTS (SELECT TOP 1 1 FROM tblCtcPersons WHERE LTRIM(RTRIM(DisplayName))=LTRIM(RTRIM(@DisplayName)) AND EntityType='O')
		BEGIN SET @ReturnMsg='用户名已经存在!'; RETURN; END
	END

	INSERT INTO tblCtcPersons (Status,EntityType,EntityKey,DisplayName,CreatedBy,CreatedDate,ModifiedBy,ModifiedDate)
	VALUES ('A',@EntityType,@EntityKey,@DisplayName,@DoneByLoginID,GETDATE(),@DoneByLoginID,GETDATE())
	SET @PersonID=SCOPE_IDENTITY();
	IF @PersonID > 0
	BEGIN
		INSERT INTO tblCtcRoles (PersonID,Organisation,OrgType,CreatedBy,CreatedDate,ModifiedBy,ModifiedDate)
		VALUES (@PersonID,'','Main',@DoneByLoginID,GETDATE(),@DoneByLoginID,GETDATE())
		SET @RoleID=SCOPE_IDENTITY();
		IF @RoleID>0
		BEGIN 
			--Update DefaultRoleID in tblCtcPersons
			EXEC [dbo].[spCtc_EnsureDefaultRoleID] @PersonID;
			SET @Success=1;
			IF Len(@RoleTags)>0
			BEGIN
				SET @Delimiter='|'
				SET @CurrentPosition = ISNULL(CHARINDEX(@Delimiter, @RoleTags, 1), 0)  
				WHILE @CurrentPosition > 0
				BEGIN
					SET @TagName = LTRIM(RTRIM(LEFT(@RoleTags,@CurrentPosition - 1))) 
					IF LEN(@TagName)>0
					BEGIN
						EXEC [dbo].[spCtc_RoleTag_Upsert] @RoleID, @TagName, @DoneByLoginID, 0, 0, 1, '';
					END
					SET @RoleTags = SUBSTRING(@RoleTags,@CurrentPosition+ LEN(@Delimiter),LEN(@RoleTags))
					SET @CurrentPosition = CHARINDEX(@Delimiter,@RoleTags, 1)
				END
			END
			EXEC [dbo].[spCtc_RebuildRGDA_RoleID] @RoleID;
		END
	END
END
GO