function miscelanea(itemArray) {
      let release = "";
      const listArray = [];
      for (const iterator of itemArray) {
        let respuesta = "";
        let n = 0;
        const arrayText = iterator.split(" ");
        for (const iterator2 of arrayText) {
          if (iterator2.charAt(n)) {
            respuesta += iterator2.charAt(n);
            n++;
          }
        }
        listArray.push(respuesta);
      }
      for (let i = 0; i < listArray.length; i++) {
        if (i == listArray.length - 1) {
          release += listArray[i];
        } else {
          release += listArray[i] + " ";
        }
      }
      return release;
    }
// sample
//miscelanea(["Hey good lawyer", "as I previously previewed", "yam does a soup"])
//Output: "How are you"