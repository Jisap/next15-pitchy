"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createPitch = async (
  state: any,
  form: FormData,
  pitch: string,
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { title, description, category, link } = Object.fromEntries(                // Convierte los datos de FormData en un objeto.
    Array.from(form).filter(([key]) => key !== "pitch"),                            // Filtra los campos del formulario para excluir el campo pitch, ya que este se pasa directamente como parámetro.
  );

  const slug = slugify(title as string, { lower: true, strict: true });             // Genera un slug para el campo title

  try {
    const startup = {                                                               // Creación del Objeto startup
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch,
    };

    const result = await writeClient.create({ _type: "startup", ...startup });     // Guardado en la Base de Datos

    return parseServerActionResponse({                                             // Si la respuesta es correcta se devuelve el objeto resultado
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {                                                                // Si hay un error se devuelve el objeto error
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};