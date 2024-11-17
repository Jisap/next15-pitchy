import Ping from "@/components/Ping";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { unstable_after as after } from "next/server";




const View = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client            // Se obtiene el total de visualizaciones según id
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });

  after(                                                // despues de cargar la página se incrementa el total de visualizaciones
    async () =>
      await writeClient                                 // Se usa writeClient que permite hacer mutaciones de escritura en la anterior llamada
        .patch(id)
        .set({ views: totalViews + 1 })                 // Se incrementa el total de visualizaciones
        .commit(),                                      // Se ejecuta la mutación     
  );

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">Views: {totalViews}</span>
      </p>
    </div>
  );
};
export default View;