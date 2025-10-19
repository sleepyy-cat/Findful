🎓 LocationLog Test Suite
========================

🧪 TEST CASE 1: Create unique locationLog
==================================
📝 Adding log...
successfully created log for item: cat sweater with space: dresser

🧪 TEST CASE 2: Create duplicate locationLog
==================================
📝 Adding log...
Attempting to create duplicate log...
thisItem already has a log

🧪 TEST CASE 3: Create no perms locationLog
==================================
Attempting to create invalid log...
thisItem and currentSpace don't have the same owner

🧪 TEST CASE 4: Place item, no existing log
==================================
📝 Placing item...
successfully placed item: cat sweater in space: dresser

🧪 TEST CASE 5: place item, same as current location
==================================
📝 Adding log...
📝 Placing item...
no changes necessary
log was unchanged
successfully placed item: cat sweater in space: dresser

🧪 TEST CASE 6: Place item, different from current location
==================================
📝 Adding log...
📝 Placing item...
successfully moved item: cat sweater to space: closet

🧪 TEST CASE 7: Delete existing LocationLog
==================================
📝 Deleting log...
successfully deleted log for: cat sweater

🧪 TEST CASE 8: Delete nonexistent locationLog
==================================
Attempting to delete nonexistent locationLog...
no log with this item exists

🎉 All test cases completed successfully!