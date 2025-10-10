export default function Resultados({ numitems, datos }) {
  return (
    <div id='resultados'>
        <h2>Resultados</h2>

        <h4>Ciudad: {datos.location.name}</h4>
        <h4>País: {datos.location.country}</h4>
        <h4>Código Timezone: {datos.location.tz_id}</h4>
        <h4>El tiempo en los próximos días será:</h4>

        <ul className="carousel-container">
            {datos.forecast.forecastday.slice(0, numitems).map((day) => (
                <li key={day.date_epoch}>
                    <p><strong>{new Date(day.date_epoch*1000).toLocaleDateString()}</strong></p>
                    <p><img src={day.day.condition.icon} alt={day.day.condition.text} className="tiempoimg"/></p>
                    <p>Temp: {day.day.avgtemp_c} °C</p>
                    <p>Humedad: {day.day.avghumidity} %</p>
                    <p>Viento: {day.day.maxwind_kph} km/h</p>
                </li>
            ))}
        </ul>


    </div>
  );
}
