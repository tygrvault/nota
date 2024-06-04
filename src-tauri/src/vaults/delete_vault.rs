use serde_json::json;
use std::{io::Error, path::PathBuf};

use tauri::{Manager, Wry};
use tauri_plugin_store::{with_store, StoreCollection};

use super::VaultSetting;

#[tauri::command]
pub async fn delete_vault(app: tauri::AppHandle, id: usize) -> Result<(), String> {
    let stores = app.state::<StoreCollection<Wry>>();
    let store_path = PathBuf::from("settings.json");

    match with_store(app.app_handle().clone(), stores, &store_path, |store| {
        let mut vault_setting: VaultSetting = match store.get("vault".to_string()) {
            Some(v) => serde_json::from_value(v.clone()).unwrap(),
            None => VaultSetting {
                list: Vec::new(),
                current: 0,
            },
        };
				
				// check if the vault list only has one item
				match vault_setting.list.len() == 1 {
					true => {
						return Err(tauri_plugin_store::Error::Io(Error::new(std::io::ErrorKind::Other, "Cannot delete the last vault. Please create a new vault before deleting this one.")));
					},
					false => (),
				}

				// find the vault to delete using the id
				let vault_index = vault_setting.list.iter().position(|v| v.id == id);

				// if the vault is found, remove it
				if let Some(index) = vault_index {
					vault_setting.list.remove(index);
				}

				store
						.insert("vault".to_string(), json!(vault_setting))
						.unwrap();
        Ok(())
    }) {
				Ok(_) => (),
				Err(e) => return Err(e.to_string()),
		}

    Ok(())
}
