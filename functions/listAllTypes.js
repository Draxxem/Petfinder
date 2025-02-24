export function printAllTypes(json) {

       json.types.forEach(type => {
        console.log(`Name: ${type.name}`);
        console.log('Coats:');
        type.coats.forEach(coat => {
          console.log(`  - ${coat}`);
        });
        console.log('Colors:');
        type.colors.forEach(color => {
          console.log(`  - ${color}`);
        });
        console.log('Genders:');
        type.genders.forEach(gender => {
          console.log(`  - ${gender}`);
        });
        console.log('Links:');
        console.log(`  Self: ${type._links.self.href}`);
        console.log(`  Breeds: ${type._links.breeds.href}`);
        console.log('-------------------');
      })
    }