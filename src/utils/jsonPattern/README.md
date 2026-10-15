We have a small json element matching lib for finding suggestions in the editor's monaco pane, and also for the webmcp to specify what it wants from a room.
# JSON patterns

A pattern picks out values in a json tree. It is a list of parts, separated by `.`:

| Part                     | Matches                                                     |
| ------------------------ | ----------------------------------------------------------- |
| `door1`                  | exactly that key                                            |
| `*`                      | any key                                                     |
| `door*`                  | any key starting `door`                                     |
| `[type=door]`            | any key whose value has that property, compared as a string |
| `[config.which=skiHead]` | the same, for a nested property                             |

Dots inside `[…]` belong to the property, not the pattern, so
`[config.which=skiHead].position` has two parts.

Examples, over a room's items:

- `door1` - the item `door1`
- `[type=door]` - every door
- `*.position` - every item's position
- `[config.which=skiHead].position` - the position of the item whose `config.which` is `skiHead`
