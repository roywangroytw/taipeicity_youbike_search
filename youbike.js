$(document).ready(function () {
  const searchbtn = document.querySelector("#searchbtn");
  const clearbtn = document.querySelector("#clear");
  const searchInputDisc = document.querySelector("#search_input_disc");
  const searchInputTxt = document.querySelector("#search_input_txt");
  const resultContainer = document.querySelector(".row");
  const footer = document.querySelector("footer");

  searchbtn.addEventListener("click", (term) => {
    const inputValueDisc = searchInputDisc.value;
    const inputValueTxt = searchInputTxt.value.trim();

    // 如果input有valide 值，才會call api
    if (inputValueDisc !== "" || inputValueTxt !== "") {
      $.ajax({
        url: "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json",
        dataType: "json",
        success: function (data) {
          data.forEach((item) => {
            const adr = item.ar;
            const disc = item.sarea;

            if (disc.includes(inputValueDisc) && adr.includes(inputValueTxt)) {
              const { sna: stationName, tot: totalSpots, sbi: freeSlots, sarea: district } = item;
              // sna : spot name
              // tot: total spots
              // sbi: free bikes to use
              // sarea: district

              const resultItem = document.createElement("div");
              const resultItemLink = document.createElement("a");
              resultItemLink.className = "item_link";
              resultItemLink.href = `https://www.google.com/maps/?q=${adr}`;
              resultItemLink.target = "_blank";

              const resultItemContent = document.createElement("div");
              resultItem.className = "col-12 col-md-4 col-lg-3";
              if (stationName.match("捷運")) {
                resultItemContent.className = "content-box mrt";
              } else {
                resultItemContent.className = "content-box";
              }

              const resultItemInfo = document.createElement("div");
              resultItemInfo.className = "info";
              const resultItemInfoName = document.createElement("h2");
              const resultItemInfoDistrict = document.createElement("p");
              const resultItemInfoAddress = document.createElement("p");

              const resultItemData = document.createElement("div");
              resultItemData.className = "data";
              const resultItemDataTotal = document.createElement("p");
              const resultItemDataAva = document.createElement("p");
              const resultItemDataAll = document.createElement("p");
              const resultItemDataFree = document.createElement("p");

              if (freeSlots === 0) {
                resultItemDataFree.className = "no_spot";
              }

              resultItemInfoName.innerText = stationName.replace("YouBike2.0_", "");
              resultItemInfoDistrict.innerText = district;
              resultItemInfoAddress.innerText = adr;
              resultItemDataTotal.innerText = "Total";
              resultItemDataAva.innerText = "Available";
              resultItemDataAll.innerText = totalSpots;
              resultItemDataFree.innerText = freeSlots;

              resultContainer.appendChild(resultItem);
              resultItem.appendChild(resultItemContent);
              resultItemContent.append(
                resultItemInfo,
                resultItemData,
                resultItemLink
              );
              resultItemInfo.append(
                resultItemInfoName,
                resultItemInfoDistrict,
                resultItemInfoAddress
              );
              resultItemData.append(
                resultItemDataTotal,
                resultItemDataAva,
                resultItemDataAll,
                resultItemDataFree
              );
            
              // Q: don't know how to make the validation when there are no results due to random search terms
              if (document.body.contains(resultItem)) {
                footer.className = "footer_w_content";
              } else {
                alert("No Result found!");
              }

            }
          });
          // Q: how to get the location of browser?
          // Q: how to make html ready and just simply use JS to duplicate and fill in the data?
          // Q: how to make the JS code better and simpler?
          // Q: why bgc in the body will be divided?
        }
      });
    } else {
      alert("無法搜尋，搜尋關鍵字至少擇其一搜尋：行政區or地址關鍵字");
    }

  });

  // clear the search input
  clearbtn.addEventListener("click", (term) => {
    searchInputDisc.value = "";
    searchInputTxt.value = "";
  });
});
