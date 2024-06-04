use std::path::PathBuf;

use serde_json::json;
use tauri::{Manager, Wry};
use tauri_plugin_store::{with_store, StoreCollection};

use super::{Vault, VaultSetting};

#[tauri::command]
pub fn create_vault(app: tauri::AppHandle, name: String, path: String) -> Result<(), String> {
    // create the path if it doesn't exist
    match std::path::Path::new(&path).exists() {
        true => (),
        false => {
            std::fs::create_dir_all(&path).map_err(|e| e.to_string())?;
        }
    }

    // store the vault information in the settings store
    let stores = app.state::<StoreCollection<Wry>>();
    let store_path = PathBuf::from("settings.json");

    let _ = with_store(app.app_handle().clone(), stores, store_path, |store| {
        // grab the old vault list
        let mut vault_setting: VaultSetting = match store.get("vault".to_string()) {
            Some(v) => serde_json::from_value(v.clone()).unwrap(),
            None => VaultSetting {
                list: Vec::new(),
                current: 0,
            },
        };

        // generate a new id for the vault
        let mut vault_id: usize = 0;
        loop {
            vault_id = rand::random::<usize>() % 1000000;
            if !vault_setting.list.iter().any(|v| v.id == vault_id) {
                break;
            }
        }

        // add the new vault to the list
        vault_setting.list.push(Vault {
            id: vault_id,
            name: name.clone(),
            path: path.clone(),
        });

        // set the current vault to the new vault
        vault_setting.current = vault_id;

        print!("vault_setting: {:?}", vault_setting);

        store
            .insert("vault".to_string(), json!(vault_setting))
            .unwrap();

        // save the new vault list
        let _ = store.save().map_err(|e| e.to_string());

        Ok(())
    });

    Ok(())
}
