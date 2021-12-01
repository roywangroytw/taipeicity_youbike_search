$(document).ready(function () {
  const searchbtn = document.querySelector("#searchbtn");
  const clearbtn = document.querySelector("#clear");
  const searchInputDisc = document.querySelector("#search_input_disc");
  const searchInputTxt = document.querySelector("#search_input_txt");
  const resultContainer = document.querySelector(".row");
  const footer = document.querySelector("footer");

  // Event 1: When searched
  searchbtn.addEventListener("click", (term) => {
    const inputValueDisc = searchInputDisc.value;
    const inputValueTxt = searchInputTxt.value.trim();
    const invalideInput = (inputValueDisc === "" && inputValueTxt === "")
    const youBikeData = callAPI(inputValueDisc,inputValueTxt);

    // 2. 如果data沒有result, 就由某個function處理(長element的方式，不要alert)
    if (youBikeData.length === 0) return noResult();

    // 3. 如果有data, 就交由另外一個function去處理渲染資訊
    if (youBikeData) return showResult(youBikeData)

  });

  //  Event 2: clear the search input ＆ search result
  clearbtn.addEventListener("click", (term) => {
    searchInputDisc.value = "";
    searchInputTxt.value = "";
    resultContainer.innerHTML = "";
    footer.className = "footer";
  });

  function showResult(youBikeData){
    youBikeData.forEach((item) => {
      const { sna: stationName, tot: totalSpots, sbi: freeSlots, sarea: district, ar: address } = item;
      const resultItem = document.createElement("div");
      const resultItemLink = document.createElement("a");
      resultItemLink.className = "item_link";
      resultItemLink.href = `https://www.google.com/maps/?q=${address}`;
      resultItemLink.target = "_blank";

      const resultItemContent = document.createElement("div");
      resultItem.className = "col-12 col-md-6 col-lg-4";
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

      resultItemInfoName.innerText = stationName.replace("YouBike2.0_", "").replace("捷運", "");
      resultItemInfoDistrict.innerText = district;
      resultItemInfoAddress.innerText = address;
      resultItemDataTotal.innerText = "Total";
      resultItemDataAva.innerText = "Available";
      resultItemDataAll.innerText = totalSpots;
      resultItemDataFree.innerText = freeSlots;

      resultContainer.appendChild(resultItem);
      resultItem.appendChild(resultItemContent);
      resultItemContent.append(
        resultItemInfo,
        resultItemData,
        resultItemLink,
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

      footer.className = "footer_w_content";

    })
  }

  function noResult(){
    const noResultcontainer = document.createElement("div");
    const noResultimg = document.createElement("img");
    const noResultmessage = document.createElement("p");

    noResultcontainer.className = "no-result";
    noResultimg.src = "images/8219606_delivery_logistic_shopping_box_package_icon.png";
    noResultmessage.innerText = "很抱歉，您目前的搜尋沒有結果，可能有錯字或者沒有符合該路名關鍵字的YouBike2.0站點";
    footer.className = "footer_w_content"

    noResultcontainer.append(noResultimg,noResultmessage);
    resultContainer.appendChild(noResultcontainer);
  }

  function callAPI(inputValueDisc,inputValueTxt){
  
    // 如果input都是空值, early return alert
    if (inputValueDisc === "" && inputValueTxt=== "") {

      alert("無法搜尋，搜尋關鍵字至少擇其一搜尋：行政區or地址關鍵字");
      return "empty input"

    } else {
      
      var processData = Array(0)
    
      $.ajax({
        url: "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json",
        dataType: "json",
        // 把ajax變成同步
        async: false,
        success: function (data) {
          processData = data.filter((item) => {
            const { sna: stationName, tot: totalSpots, sbi: freeSlots, sarea: district, ar: address } = item;
            if (district.includes(inputValueDisc) && address.includes(inputValueTxt)) {
              return item
            }
          })
        }
      })
    }
    return processData
  }

})


          // Q: how to get the location of browser?
          // Q: how to click btn again to clear the result first and then do the search?


