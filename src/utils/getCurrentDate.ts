export  function getCurrentDate():Date{
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}