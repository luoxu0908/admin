//display item master list
function GenItemMaster(ItemDetails) {
  return $.JSONPost("iInv1.GenItemMaster.json", ItemDetails);
}