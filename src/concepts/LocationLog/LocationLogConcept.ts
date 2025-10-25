import { Item } from "../Item/implementation.ts";
import { Space } from "@concepts/Space/implementation.ts";

// A single locationlog
export interface LocationLog {
  thisItem: Item;
  currentSpace: Space;
  locationHistory: Space[];
}

export class LocationLogs {
  private locationLogs: LocationLog[] = [];

  createLog(thisItem: Item, currentSpace: Space): LocationLog | void {
    // Check that thisItem and currentSpace exist
    if (!thisItem.name || !currentSpace.name) {
      console.log("thisItem or currentSpace don't exist");
      return;
    }
    // Check that thisItem and currentSpace have the same owner
    if (thisItem.owner.username !== currentSpace.owner.username) {
      console.log("thisItem and currentSpace don't have the same owner");
    }
    for (const log of this.locationLogs) {
      // Check if a log currently exists for thisItem
      if (
        log.thisItem.owner.username == thisItem.owner.username &&
        log.thisItem.name == thisItem.name
      ) {
        console.log("thisItem already has a log");
        return;
      }
    }
    const locationLog: LocationLog = {
      thisItem,
      currentSpace,
      locationHistory: [currentSpace],
    };
    // Add locationLog to list of LocationLogs
    this.locationLogs.push(locationLog);
    return locationLog;
  }

  placeItem(linkItem: Item, linkSpace: Space): void {
    // Check that linkItem and linkSpace exist
    if (!linkItem.name || !linkSpace.name) {
      console.log("linkItem or linkSpace don't exist");
      return;
    }
    for (const log of this.locationLogs) {
      // Check if a log currently exists for thisItem
      if (
        log.thisItem.owner.username == linkItem.owner.username &&
        log.thisItem.name == linkItem.name
      ) {
        // If the current space in log for thisItem is linkSpace
        if (
          log.currentSpace.owner.username == linkSpace.owner.username &&
          log.currentSpace.name == linkSpace.name
        ) {
          console.log("no changes necessary");
          return;
        } // If the current space in log for thisItem is not linkSpace
        else {
          log.locationHistory.push(linkSpace);
          log.currentSpace = linkSpace;
          return;
        }
      }
    }
    // If there is no log for thisItem
    const _ = this.createLog(linkItem, linkSpace);
  }

  deleteLog(currItem: Item): void {
    for (const log of this.locationLogs) {
      // Check if a log currently exists for thisItem
      if (
        log.thisItem.owner.username == currItem.owner.username &&
        log.thisItem.name == currItem.name
      ) {
        this.locationLogs = this.locationLogs.filter((l) => l !== log);
        return;
      }
      console.log("no log with this item exists");
      return;
    }
  }

  getItemLog(item: Item): LocationLog | void {
    for (const log of this.locationLogs) {
      // If a log currently exists for thisItem
      if (
        log.thisItem.owner.username == item.owner.username &&
        log.thisItem.name == item.name
      ) {
        return log;
      }
    }
    return;
  }

  getLogs(): LocationLog[] {
    return this.locationLogs;
  }

  equals(log1: LocationLog, log2: LocationLog): boolean {
    if (log1.locationHistory.length !== log2.locationHistory.length) {
      return false;
    }
    for (let i = 0; i < log1.locationHistory.length; i++) {
      if (log1.locationHistory[i].name !== log2.locationHistory[i].name) {
        return false;
      }
    }
    return log1.thisItem.name == log2.thisItem.name &&
      log1.thisItem.owner.username == log2.thisItem.owner.username &&
      log1.currentSpace.name == log2.currentSpace.name &&
      log1.currentSpace.owner.username == log2.currentSpace.owner.username;
  }
}
