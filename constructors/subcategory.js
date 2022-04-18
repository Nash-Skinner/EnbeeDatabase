//May be getting removed
//TODO: Check with SRDC API
export default class Subcategory {
    constructor(SubcategoryName, Abbrev, Rules) {
        this.SubcategoryName = SubcategoryName;
        this.Abbrev = Abbrev;
        this.Rules = Rules;
    }

	toSQL() {
		return `INSERT INTO Subcategory(SubcategoryName, Abbrev, Rules) VALUES('${this.SubcategoryName}', '${this.Abbrev}', '${this.Rules}');`;
	}
}