
import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(20).max(500),
  category: z.string().min(3).max(20),
  link: z.string().url().refine(async (url) => {           // Se asegura de que el enlace proporcionado sea válido y apunte a una imagen
    try {
      const res = await fetch(url, { method: "HEAD" });    // Obtenemos los headers (tipo y tamaño) pero no su contenido
      const contentType = res.headers.get("content-type"); // Obtenemos el tipo de contenido
      return contentType?.startsWith("image/")             // Si es una imagen, devolvemos true
    }catch{
      return false                                         // Si no es posible obtener el contenido, devolvemos false
    }
  }),
  pitch: z.string().min(10)
})