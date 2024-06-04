use serde::{Deserialize, Serialize};

// TOOD: These should probably not live here but I don't know where to put them atm
#[derive(Serialize, Deserialize, Debug)]
struct Vault {
    id: usize,
    name: String,
    path: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct VaultSetting {
    list: Vec<Vault>,
    current: usize,
}

mod create_vault;
mod delete_vault;

pub use create_vault::create_vault;
pub use delete_vault::delete_vault;
