import Noty from "noty";

export const notify = (text: string, type: Noty.Type = "info", timeout = 3000) => {
    const noty = new Noty({
        text: text,
        type: type,
        theme: "semanticui",
        timeout: timeout,
    });
    noty.show();
}
