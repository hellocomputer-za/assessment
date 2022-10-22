const staffMembers = [
  {
    _id: 0,
    name: "David",
    surname: "Smith",
    slug: "david-smith",
    category: "operations",
    title: "Head of Development",
    reportsTo: "bruce-davids",
  },
  {
    _id: 1,
    name: "John",
    surname: "Jones",
    slug: "john-jones",
    category: "operations",
    title: "Head of Marketing",
    reportsTo: "bruce-davids",
  },
  {
    _id: 2,
    name: "Jane",
    surname: "Sampson",
    slug: "jane-sampson",
    category: "operations",
    title: "Head of Content",
    reportsTo: "bruce-davids",
  },
  {
    _id: 3,
    name: "Nick",
    surname: "Thompson",
    slug: "nick-thompson",
    category: "operations",
    title: "Head of Design",
    reportsTo: "terry-cats",
  },
  {
    _id: 4,
    name: "Nick",
    surname: "Jenson",
    slug: "nick-jenson",
    category: "interns",
    title: "Intern designer",
    reportsTo: "nick-thompson",
  },
  {
    _id: 5,
    name: "Simon",
    surname: "Says",
    slug: "simon-says",
    category: "operations",
    title: "Head of Strategy",
    reportsTo: "bruce-davids",
  },
  {
    _id: 6,
    name: "Terry",
    surname: "Cats",
    slug: "terry-cats",
    category: "c-suite",
    title: "Chief Creative Officer",
    reportsTo: "",
  },
  {
    _id: 7,
    name: "Bruce",
    surname: "Davids",
    slug: "bruce-davids",
    category: "c-suite",
    title: "Chief Strategy Officer",
    reportsTo: "",
  },
  {
    _id: 8,
    name: "Bill",
    surname: "Bass",
    slug: "bill-bass",
    category: "c-suite",
    title: "Chief Executive Officer",
    reportsTo: "",
  },
];

const categories = [
  {
    _id: 0,
    name: "Executive",
    parent: "",
    slug: "c-suite",
  },
  {
    _id: 1,
    name: "Operations",
    parent: "c-suite",
    slug: "operations",
  },
  {
    _id: 2,
    name: "Interns",
    parent: "operations",
    slug: "interns",
  },
];

const retrieveCategoryName = (categoryList, category) => {
  let categoryName = null;
  for (let item of categoryList) {
    if (category == item.slug) {
      categoryName = item.name;
    }
  }
  return categoryName;
};

const createHierarchies = (staffMemberList, categoryList, reportTo) => {
  const hierarchList = [];
  let staffMembers = null;
  if (reportTo === "") {
    staffMembers = staffMemberList.filter((member) => member.reportsTo === "");
  } else {
    staffMembers = staffMemberList.filter(
      (item) => item.reportsTo === reportTo
    );
  }

  for (let item of staffMembers) {
    let categoryName = retrieveCategoryName(categoryList, item.category);

    const child = createHierarchies(staffMemberList, categoryList, item.slug);

    let newHierarchy = {
      description: `${item.name} ${item.surname} - ${item.title}: ${categoryName}`,
      reportsTo: item.reportsTo,
      children: child.length != 0 ? child.map((i) => i) : null,
    };
    Object.keys(newHierarchy).forEach((key) => {
      if (newHierarchy[key] === null) {
        delete newHierarchy[key];
      }
    });
    hierarchList.push({ ...newHierarchy });
  }

  return hierarchList;
};

const retrieveHierarchies = () => {
  const staffList = staffMembers;
  const categoryList = categories;
  const hierarchyList = createHierarchies(staffList, categoryList, ""); 

  
  console.info(
    ` *${hierarchyList[0].description} \n     *${hierarchyList[0].children[0].description}  \n          *${hierarchyList[0].children[0].children[0].description}\n`
  );

  console.info(` *${hierarchyList[1].description} \n     *${hierarchyList[1].children[0].description}   \n     *${hierarchyList[1].children[1].description}    \n     *${hierarchyList[1].children[2].description}    \n     *${hierarchyList[1].children[3].description}  \n`);

  console.info(` *${hierarchyList[2].description}`);

  return hierarchyList;
};

retrieveHierarchies();
