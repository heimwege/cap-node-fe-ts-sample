import type Renderer from "sap/ushell/renderers/fiori2/Renderer";

interface ExtendedRenderer extends Renderer {
    placeAt: (location: string) => void
}

/**
 * Create a new renderer and place it at the HTML element with the id "content" (should be the "body" tag)
 * @returns {Promise<void>} a promise that is resolved once the renderer has been attached to the HTML element
 */
function load () {
    // @ts-expect-error: Container not part of type ushell
    return (sap.ushell.Container.createRenderer(undefined, true) as Promise<ExtendedRenderer>).then(renderer => {
        renderer.placeAt("content");
    });
}

export default load();
