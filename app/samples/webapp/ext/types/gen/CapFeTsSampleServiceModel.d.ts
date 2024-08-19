export interface Samples {
    /**
     * **Key Property**: This is a key property used to identify the entity.<br/>**Managed**: This property is managed on the server side and cannot be edited.
     *
     * OData Attributes:
     * |Attribute Name | Attribute Value |
     * | --- | ---|
     * | Name | `ID` |
     * | Type | `Edm.Guid` |
     * | Nullable | `false` |
     */
    ID: string;
    /**
     * **Managed**: This property is managed on the server side and cannot be edited.
     *
     * OData Attributes:
     * |Attribute Name | Attribute Value |
     * | --- | ---|
     * | Name | `createdAt` |
     * | Type | `Edm.DateTimeOffset` |
     */
    createdAt: string | null;
    /**
     * **Managed**: This property is managed on the server side and cannot be edited.
     *
     * OData Attributes:
     * |Attribute Name | Attribute Value |
     * | --- | ---|
     * | Name | `createdBy` |
     * | Type | `Edm.String` |
     */
    createdBy: string | null;
    /**
     * **Managed**: This property is managed on the server side and cannot be edited.
     *
     * OData Attributes:
     * |Attribute Name | Attribute Value |
     * | --- | ---|
     * | Name | `modifiedAt` |
     * | Type | `Edm.DateTimeOffset` |
     */
    modifiedAt: string | null;
    /**
     * **Managed**: This property is managed on the server side and cannot be edited.
     *
     * OData Attributes:
     * |Attribute Name | Attribute Value |
     * | --- | ---|
     * | Name | `modifiedBy` |
     * | Type | `Edm.String` |
     */
    modifiedBy: string | null;
    /**
     *
     * OData Attributes:
     * |Attribute Name | Attribute Value |
     * | --- | ---|
     * | Name | `name` |
     * | Type | `Edm.String` |
     */
    name: string | null;
    /**
     * **Key Property**: This is a key property used to identify the entity.<br/>**Managed**: This property is managed on the server side and cannot be edited.
     *
     * OData Attributes:
     * |Attribute Name | Attribute Value |
     * | --- | ---|
     * | Name | `IsActiveEntity` |
     * | Type | `Edm.Boolean` |
     * | Nullable | `false` |
     */
    IsActiveEntity: boolean;
    /**
     * **Managed**: This property is managed on the server side and cannot be edited.
     *
     * OData Attributes:
     * |Attribute Name | Attribute Value |
     * | --- | ---|
     * | Name | `HasActiveEntity` |
     * | Type | `Edm.Boolean` |
     * | Nullable | `false` |
     */
    HasActiveEntity: boolean;
    /**
     * **Managed**: This property is managed on the server side and cannot be edited.
     *
     * OData Attributes:
     * |Attribute Name | Attribute Value |
     * | --- | ---|
     * | Name | `HasDraftEntity` |
     * | Type | `Edm.Boolean` |
     * | Nullable | `false` |
     */
    HasDraftEntity: boolean;
    /**
     *
     * OData Attributes:
     * |Attribute Name | Attribute Value |
     * | --- | ---|
     * | Name | `comments` |
     * | Type | `Collection(CapFeTsSampleService.Comments)` |
     */
    comments?: Array<Comments>;
    /**
     *
     * OData Attributes:
     * |Attribute Name | Attribute Value |
     * | --- | ---|
     * | Name | `DraftAdministrativeData` |
     * | Type | `CapFeTsSampleService.DraftAdministrativeData` |
     */
    DraftAdministrativeData?: DraftAdministrativeData | null;
    /**
     *
     * OData Attributes:
     * |Attribute Name | Attribute Value |
     * | --- | ---|
     * | Name | `SiblingEntity` |
     * | Type | `CapFeTsSampleService.Samples` |
     */
    SiblingEntity?: Samples | null;
}
export type SamplesId = {
    ID: string;
    IsActiveEntity: boolean;
};
export interface EditableSamples extends Partial<Pick<Samples, "name">> {
}
export interface Samples_draftPrepareParams {
    SideEffectsQualifier?: string | null;
}
export interface Samples_draftEditParams {
    PreserveChanges?: boolean | null;
}
export interface Comments {
    /**
     * **Key Property**: This is a key property used to identify the entity.<br/>**Managed**: This property is managed on the server side and cannot be edited.
     *
     * OData Attributes:
     * |Attribute Name | Attribute Value |
     * | --- | ---|
     * | Name | `ID` |
     * | Type | `Edm.Guid` |
     * | Nullable | `false` |
     */
    ID: string;
    /**
     * **Managed**: This property is managed on the server side and cannot be edited.
     *
     * OData Attributes:
     * |Attribute Name | Attribute Value |
     * | --- | ---|
     * | Name | `createdAt` |
     * | Type | `Edm.DateTimeOffset` |
     */
    createdAt: string | null;
    /**
     * **Managed**: This property is managed on the server side and cannot be edited.
     *
     * OData Attributes:
     * |Attribute Name | Attribute Value |
     * | --- | ---|
     * | Name | `createdBy` |
     * | Type | `Edm.String` |
     */
    createdBy: string | null;
    /**
     * **Managed**: This property is managed on the server side and cannot be edited.
     *
     * OData Attributes:
     * |Attribute Name | Attribute Value |
     * | --- | ---|
     * | Name | `modifiedAt` |
     * | Type | `Edm.DateTimeOffset` |
     */
    modifiedAt: string | null;
    /**
     * **Managed**: This property is managed on the server side and cannot be edited.
     *
     * OData Attributes:
     * |Attribute Name | Attribute Value |
     * | --- | ---|
     * | Name | `modifiedBy` |
     * | Type | `Edm.String` |
     */
    modifiedBy: string | null;
    /**
     *
     * OData Attributes:
     * |Attribute Name | Attribute Value |
     * | --- | ---|
     * | Name | `text` |
     * | Type | `Edm.String` |
     */
    text: string | null;
    /**
     *
     * OData Attributes:
     * |Attribute Name | Attribute Value |
     * | --- | ---|
     * | Name | `type` |
     * | Type | `Edm.String` |
     */
    type: string | null;
    /**
     *
     * OData Attributes:
     * |Attribute Name | Attribute Value |
     * | --- | ---|
     * | Name | `sample_ID` |
     * | Type | `Edm.Guid` |
     */
    sample_ID: string | null;
    /**
     * **Key Property**: This is a key property used to identify the entity.<br/>**Managed**: This property is managed on the server side and cannot be edited.
     *
     * OData Attributes:
     * |Attribute Name | Attribute Value |
     * | --- | ---|
     * | Name | `IsActiveEntity` |
     * | Type | `Edm.Boolean` |
     * | Nullable | `false` |
     */
    IsActiveEntity: boolean;
    /**
     * **Managed**: This property is managed on the server side and cannot be edited.
     *
     * OData Attributes:
     * |Attribute Name | Attribute Value |
     * | --- | ---|
     * | Name | `HasActiveEntity` |
     * | Type | `Edm.Boolean` |
     * | Nullable | `false` |
     */
    HasActiveEntity: boolean;
    /**
     * **Managed**: This property is managed on the server side and cannot be edited.
     *
     * OData Attributes:
     * |Attribute Name | Attribute Value |
     * | --- | ---|
     * | Name | `HasDraftEntity` |
     * | Type | `Edm.Boolean` |
     * | Nullable | `false` |
     */
    HasDraftEntity: boolean;
    /**
     *
     * OData Attributes:
     * |Attribute Name | Attribute Value |
     * | --- | ---|
     * | Name | `sample` |
     * | Type | `CapFeTsSampleService.Samples` |
     */
    sample?: Samples | null;
    /**
     *
     * OData Attributes:
     * |Attribute Name | Attribute Value |
     * | --- | ---|
     * | Name | `DraftAdministrativeData` |
     * | Type | `CapFeTsSampleService.DraftAdministrativeData` |
     */
    DraftAdministrativeData?: DraftAdministrativeData | null;
    /**
     *
     * OData Attributes:
     * |Attribute Name | Attribute Value |
     * | --- | ---|
     * | Name | `SiblingEntity` |
     * | Type | `CapFeTsSampleService.Comments` |
     */
    SiblingEntity?: Comments | null;
}
export type CommentsId = {
    ID: string;
    IsActiveEntity: boolean;
};
export interface EditableComments extends Partial<Pick<Comments, "text" | "type" | "sample_ID">> {
}
export interface Comments_draftPrepareParams {
    SideEffectsQualifier?: string | null;
}
export interface DraftAdministrativeData {
    /**
     * **Key Property**: This is a key property used to identify the entity.<br/>**Managed**: This property is managed on the server side and cannot be edited.
     *
     * OData Attributes:
     * |Attribute Name | Attribute Value |
     * | --- | ---|
     * | Name | `DraftUUID` |
     * | Type | `Edm.Guid` |
     * | Nullable | `false` |
     */
    DraftUUID: string;
    /**
     *
     * OData Attributes:
     * |Attribute Name | Attribute Value |
     * | --- | ---|
     * | Name | `CreationDateTime` |
     * | Type | `Edm.DateTimeOffset` |
     */
    CreationDateTime: string | null;
    /**
     *
     * OData Attributes:
     * |Attribute Name | Attribute Value |
     * | --- | ---|
     * | Name | `CreatedByUser` |
     * | Type | `Edm.String` |
     */
    CreatedByUser: string | null;
    /**
     *
     * OData Attributes:
     * |Attribute Name | Attribute Value |
     * | --- | ---|
     * | Name | `DraftIsCreatedByMe` |
     * | Type | `Edm.Boolean` |
     */
    DraftIsCreatedByMe: boolean | null;
    /**
     *
     * OData Attributes:
     * |Attribute Name | Attribute Value |
     * | --- | ---|
     * | Name | `LastChangeDateTime` |
     * | Type | `Edm.DateTimeOffset` |
     */
    LastChangeDateTime: string | null;
    /**
     *
     * OData Attributes:
     * |Attribute Name | Attribute Value |
     * | --- | ---|
     * | Name | `LastChangedByUser` |
     * | Type | `Edm.String` |
     */
    LastChangedByUser: string | null;
    /**
     *
     * OData Attributes:
     * |Attribute Name | Attribute Value |
     * | --- | ---|
     * | Name | `InProcessByUser` |
     * | Type | `Edm.String` |
     */
    InProcessByUser: string | null;
    /**
     *
     * OData Attributes:
     * |Attribute Name | Attribute Value |
     * | --- | ---|
     * | Name | `DraftIsProcessedByMe` |
     * | Type | `Edm.Boolean` |
     */
    DraftIsProcessedByMe: boolean | null;
}
export type DraftAdministrativeDataId = string | {
    DraftUUID: string;
};
export interface EditableDraftAdministrativeData extends Partial<Pick<DraftAdministrativeData, "CreationDateTime" | "CreatedByUser" | "DraftIsCreatedByMe" | "LastChangeDateTime" | "LastChangedByUser" | "InProcessByUser" | "DraftIsProcessedByMe">> {
}
