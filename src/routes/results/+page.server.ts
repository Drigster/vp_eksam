import { db } from "$lib/db";

export const load = async ({ locals }) => {
    let varvid = await db.selectFrom("Varv").selectAll().execute();

    return { varvid };
};