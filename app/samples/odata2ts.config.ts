import { Modes, EmitModes } from "@odata2ts/odata2ts";
import type { ConfigFileOptions } from "@odata2ts/odata2ts";

const managedProperties = ["ID", "createdAt", "createdBy", "modifiedAt", "modifiedBy", "IsActiveEntity", "HasActiveEntity", "HasDraftEntity"]

const config: ConfigFileOptions = {
    debug: true,
    mode: Modes.models,
    emitMode: EmitModes.dts,
    skipEditableModels: false,
    skipIdModels: false,
    skipOperations: false,
    services: {
        CapFeTsSampleService: {
            source: "webapp/localService/metadata.xml",
            output: "webapp/ext/types/gen",
            propertiesByName: [
                ...managedProperties.map(property => ({ name: property, managed: true }))
            ]
        }
    }
};

export default config;
