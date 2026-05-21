const original = {
    name: "Rama",
    address: {
        city: "Hyderabad",
        state: {
            name: "Telangana",
            pincode: 500081,
            street: {
                name: 'Secundrabad',
                area: {
                    name: "Bholakpur",
                    houseno: 101
                }
            }
        }
    },
};


const copy = structuredClone(original);

console.log(copy, original);
copy.address.state.name = "Delhi"
console.log(copy.address.state.name);
console.log(original.address.state.name)




