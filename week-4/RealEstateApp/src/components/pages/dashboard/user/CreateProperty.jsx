import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAll } from "../../../../services/EntityService";
import { createProperty } from "../../../../services/PropertyService";
import { SelectMap } from "../../../reusable/map/SelectMap";
import { defaultLatitude, defaultLongitude } from "../../../../helpers/MapData";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export const CreateProperty = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState(null);
  const [propertyTypeId, setPropertyTypeId] = useState(-1);
  const [propertyStatusId, setPropertyStatusId] = useState(-1);
  const [currencyId, setCurrencyId] = useState(-1);
  const [price, setPrice] = useState(-1);
  const [endDate, setEndDate] = useState(new Date());
  const [images, setImages] = useState([]);
  const [lat, setLat] = useState(defaultLatitude);
  const [long, setLong] = useState(defaultLongitude);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [propertyStatuses, setPropertyStatuses] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validate()) {
      setInfo("Please fill all the fields.");
      setLoading(false);
      return;
    }
    if (!checkDate(endDate)) {
      setInfo("Please select a date in the future.");
      setLoading(false);
      return;
    }
    const data = {
      endDate: format(endDate, "yyyy-MM-dd"),
      propertyTypeId: propertyTypeId,
      propertyStatusId: propertyStatusId,
      currencyId: currencyId,
      price: price,
      images: images,
      latitude: lat.toFixed(2),
      longitude: long.toFixed(2),
    };
    const response = await createProperty(data);
    if (!response) {
      setInfo("Something went wrong. Please try again later.");
    } else {
      const statusCode = response.statusCode;
      switch (statusCode) {
        case 200:
          navigate("/dashboard", { replace: true });
          break;
        case 400:
          setInfo(response.data.message);
          break;
        case 401:
          navigate("/logout", { replace: true });
          break;
        case 403:
          setInfo("You are not authorized to perform this action.");
          break;
      }
    }
  };

  const validate = () => {
    if (
      propertyTypeId === -1 ||
      propertyStatusId === -1 ||
      currencyId === -1 ||
      price === -1 ||
      images.length === 0
    ) {
      return false;
    }
    return true;
  };

  const fetchCurrencies = async () => {
    const response = await getAll("Currency");
    if (response && response.statusCode === 200) setCurrencies(response.data);
  };

  const fetchPropertyStatuses = async () => {
    const response = await getAll("PropertyStatus");
    if (response && response.statusCode === 200)
      setPropertyStatuses(response.data);
  };

  const fetchPropertyTypes = async () => {
    const response = await getAll("PropertyType");
    if (response && response.statusCode === 200)
      setPropertyTypes(response.data);
  };

  const checkDate = (date) => {
    const today = new Date();
    if (date < today) {
      setInfo("Please select a date in the future.");
      return false;
    }
    setInfo(null);
    return true;
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCurrencies();
      await fetchPropertyStatuses();
      await fetchPropertyTypes();
    };
    fetchData();
  }, []);

  return (
    <section className="flex flex-row">
      <div className="basis-1/2">
        <form
          onSubmit={handleSubmit}
          className="form-control w-full max-w-xs mx-auto pb-8"
        >
          <div>
            <label className="label">Property Type</label>
            <select
              defaultValue="Select a property type"
              className="select select-bordered select-sm w-full max-w-xs"
              onChange={(e) => {
                setPropertyTypeId(e.target.value);
              }}
            >
              <option disabled>Select a property type</option>
              {propertyTypes.map((data) => (
                <option key={data.id} value={data.id}>
                  {data.value}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Property Status</label>
            <select
              defaultValue="Select a property status"
              className="select select-bordered select-sm w-full max-w-xs"
              onChange={(e) => {
                setPropertyStatusId(e.target.value);
              }}
            >
              <option disabled>Select a property status</option>
              {propertyStatuses.map((data) => (
                <option key={data.id} value={data.id}>
                  {data.value}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Currency</label>
            <select
              defaultValue="Select a currency"
              className="select select-bordered select-sm w-full max-w-xs"
              onChange={(e) => {
                setCurrencyId(e.target.value);
              }}
            >
              <option disabled>Select a currency</option>
              {currencies.map((data) => (
                <option key={data.id} value={data.id}>
                  {data.value}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Price</label>
            <input
              type="number"
              required
              min={1000}
              onChange={(e) => setPrice(e.target.value)}
              title="This field is required"
              className="input input-bordered input-sm"
              placeholder="Enter price"
            />
          </div>
          <div>
            <label className="label">Listing Expiry Date</label>
            <DayPicker
              className="m-0"
              mode="single"
              selected={endDate}
              onDayClick={(e) => {
                checkDate(e) && setEndDate(e);
              }}
              footer={`Chosen expiry date: ${format(endDate, "dd/MM/yyyy")}`}
            />
          </div>
          <div>
            <label className="label">Property Images</label>
            <input
              type="file"
              multiple={true}
              required
              accept=".jpg, .jpeg, .png"
              className="file-input file-input-bordered file-input-sm w-full max-w-xs"
              onChange={(e) => {
                setImages(e.target.files);
              }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-accent p-2 mt-2 disabled:cursor-not-allowed"
          >
            {loading ? "Creating property..." : "Create Property"}
          </button>
          <div>
            <p className="text-xs text-red-500">{info}</p>
          </div>
        </form>
      </div>
      <div className="basis-1/2">
        <div className="mx-auto mr-4">
          <div>
            <h1>Property Location</h1>
            <SelectMap
              lat={lat}
              long={long}
              setLat={setLat}
              setLong={setLong}
            />
          </div>
          <div>
            <h1 className="pb-2">Image Preview</h1>
            <div className="flex">
              {images.length > 0 ? (
                <div className="carousel carousel-center rounded-box mx-auto">
                  {Array.from(images).map((image) => (
                    <div className="carousel-item" key={image.name}>
                      <img
                        className="block w-96 h-72"
                        src={URL.createObjectURL(image)}
                        alt={image.name}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mx-auto my-24">No images selected</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
