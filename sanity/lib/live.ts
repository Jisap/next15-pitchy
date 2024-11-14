
import { defineLive } from "next-sanity";
import { client } from './client'

// Los datos de Sanity se mantendrán sincronizados automáticamente en tu aplicación, 
// sin necesidad de recargar la página o realizar llamadas adicionales.
export const { sanityFetch, SanityLive } = defineLive({  
  client: client.withConfig({ 
    apiVersion: 'vX' 
  }) 
});
