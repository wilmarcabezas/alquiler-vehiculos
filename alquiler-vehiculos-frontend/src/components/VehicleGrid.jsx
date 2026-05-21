import VehicleCard from './VehicleCard'

/** Grid de tarjetas para renderizar la colección de vehículos. */
const VehicleGrid = ({ vehicles }) => {
  return (
    <section className="vehicle-grid">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </section>
  )
}

export default VehicleGrid
