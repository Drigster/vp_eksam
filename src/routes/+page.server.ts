import { message, setError, superValidate } from "sveltekit-superforms";
import { fail, redirect } from "@sveltejs/kit";
import { zod } from "sveltekit-superforms/adapters";
import { date, z } from "zod";
import { db } from "$lib/db";

const schema = z.object({
    sugu: z.string(),
    varv: z.string(),
});

export const load = async ({ locals }) => {
    let varvid_obj = await db.selectFrom("Varv").select("name").execute();

    let varvid = varvid_obj.map((v) => v.name);

    const form = await superValidate(zod(schema));

    return { form, varvid };
};

export const actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(schema));

        if (!form.valid) {
            return fail(400, { form });
        }

        if (form.data.sugu == "") {
            return setError(form, "sugu", "Palun vali sugu!");
        }
        else if (form.data.sugu != "Mees" && form.data.sugu != "Naine") {
            return setError(form, "sugu", "Sugu on vigane!");
        }

        if (form.data.varv == "") {
            return setError(form, "varv", "Palun vali varv!");
        }

        let varv = await db.selectFrom("Varv").selectAll().where("name", "=", form.data.varv).executeTakeFirst()

        if (varv == undefined) {
            varv = await db.insertInto("Varv").values({ name: form.data.varv, mehed: 0, naised: 0 }).returningAll().executeTakeFirst();
        }

        if (varv == undefined) {
            return fail(500, { form });
        }

        if (form.data.sugu == "Mees") {
            await db.updateTable("Varv").set({ mehed: varv.mehed + 1 }).where("name", "=", form.data.varv).executeTakeFirst();
        }
        else if (form.data.sugu == "Naine") {
            await db.updateTable("Varv").set({ naised: varv.naised + 1 }).where("name", "=", form.data.varv).executeTakeFirst();
        }
        return redirect(303, "/results");
    }
};