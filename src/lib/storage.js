// Flaggor som sparas i webbläsaren mellan besök. localStorage kan saknas
// eller vara blockerat (t.ex. privat läge), då beter sig appen som vid första besöket.
export const readFlag = (key) => {
  try {
    return window.localStorage.getItem(key) === "true";
  } catch {
    return false;
  }
};

export const setFlag = (key) => {
  try {
    window.localStorage.setItem(key, "true");
  } catch {
    // Inget att göra – flaggan gäller då bara den här sidvisningen
  }
};
