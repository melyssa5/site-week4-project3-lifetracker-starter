import "./NutritionPage.css";

export default function NutritionPage({ appState, setAppState }) {
  return (
    <div className="NutritionPage">
      <div className="nutrition-header-div">
        <div className="nutrition-header-container">
          <h2 className="nutrition-header">Nutrition</h2>
        </div>
      </div>

      <div>
        <div className="css-vpbd2d">
          <div className="css-1qfrez2">
            <div className="css-uiodal">
              <div className="nutrition-feed">
                <a
                  className="chakra-link button css-spn4bz"
                  href="/nutrition/create"
                >
                  <button type="button" className="chakra-button css-ez23ye">
                    Record Nutrition
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
