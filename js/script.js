var c1 = [];
var c2 = [];
$(document).ready(function() {

  //summary
  $.ajax({
    url: 'https://api.covid19api.com/summary',
    method: 'GET',
    success: function(response) {
      let tbl = $('.data-table');
      let dashboard = tbl.find("tbody");
      let varnames  = tbl.find("thead th");
      let appendstr = "";
      let countrydata = response.Countries;
      dashboard.empty()
      let o = 0;
      for( let data of countrydata ){
          appendstr += `<tr>`;
          for (let i of varnames){
            appendstr += `<td>${data[$(i).text()]}</td>`;  
          }
          appendstr += `</tr>`;
          
          if( o < 8 ){
            //c1.push({country:data.Slug,confirmed:data.TotalConfirmed});
            c1.push({country:data.Country, confirmed:data.TotalConfirmed});
            c2.push({country:data.Country, deaths:data.TotalDeaths});
          }
      o++;
      }
      dashboard.append($(appendstr));
      // display charts and other HTML elements here
      $(".data-table").each(function (_, table) {
        $(table).DataTable();
      });

      createchart();
    },
    error: function(error) {
      console.log(error);
    }
  });

  function createchart(){

    const charts1 = document.querySelectorAll(".chart-1");
    charts1.forEach(function (chart) {
      var ctx = chart.getContext("2d");
      var myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: c1.map( ({ country }) => country),
          datasets: [
            {
              label: "Total Number",
              data: c1.map( ({ confirmed }) => confirmed),
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    });

    const charts2 = document.querySelectorAll(".chart-2");
    charts2.forEach(function (chart) {
      var ctx = chart.getContext("2d");
      var myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: c2.map( ({ country }) => country),
          datasets: [
            {
              label: "Total Number",
              data: c2.map( ({ deaths }) => deaths),
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    });
  }
});