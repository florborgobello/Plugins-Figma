const GROUP_NAME = "XL";

function flattenGroupElements() {
  const selection = figma.currentPage.selection[0];

  // Check if the selection exists and is a group node
  if (selection && selection.type === "FRAME") {
    // Filter the children of the selection that have type === 'COMPONENT_SET'
    const componentSets = selection.children.filter(
      (child) => child.type === "COMPONENT_SET"
    );

    // Loop through each component set and filter its children that have name equals to XL, LG, MD, or SM
    const elementsToFlatten = [];
    for (const componentSet of componentSets) {
      const children = componentSet.children.filter((child) => {
        const NAMES = ["Size=XL", "Size=LG", "Size=MD", "Size=SM"];
        return NAMES.includes(child.name);
      });
      elementsToFlatten.push(...children);
    }

    // Apply the flatten method to each element in the elementsToFlatten array
    for (const element of elementsToFlatten) {
      figma.flatten(element.children);
    }
  }

  figma.closePlugin();
}

// function findElementsCagados() {
//   const selection = figma.currentPage.selection[0];

//   // Check if the selection exists and is a group node
//   if (selection && selection.type === "FRAME") {
//     // Filter the children of the selection that have type === 'COMPONENT_SET'
//     const componentSets = selection.children.filter(
//       (child) => child.type === "COMPONENT_SET"
//     );

//     // Loop through each component set and filter its children that have name equals to XL, LG, MD, or SM
//     const elementsToFlatten = [];
//     for (const componentSet of componentSets) {
//       const children = componentSet.children.filter((child) => {
//         const NAMES = ["Size=XL", "Size=LG", "Size=MD", "Size=SM"];
//         return !NAMES.includes(child.name);
//       });
//       elementsToFlatten.push(...children);
//     }
//     figma.currentPage.selection = elementsToFlatten;
//     console.log(elementsToFlatten);
//   }

//   figma.closePlugin();
// }

figma.on("run", flattenGroupElements);
