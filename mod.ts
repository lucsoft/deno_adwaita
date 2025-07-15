import { ActionRow, AlertDialog, Application, ApplicationWindow, Avatar, Banner, ButtonRow, ComboRow, ExpanderRow, HeaderBar, NavigationPage, NavigationSplitView, NavigationView, PreferencesDialog, PreferencesGroup, PreferencesPage, ResponseAppearance, Spinner, SpinRow, SwitchRow, ToolbarView } from "./adw.ts";
import { GtkBox, GtkButton, GtkLabel, GtkOrientation, GtkStringList } from "./gtk4.ts";

new Application("com.example.MyApp")
    .signalActivate((gtk) => {
        let counter = 0;

        const propertiesPages = new PreferencesPage()
            .setProperty("title", "My Preferences Page")
            .setProperty("icon-name", "preferences-system-symbolic")
            .setBanner(new Banner("Welcome to My Preferences Page")
                .setProperty("revealed", true)
                .setProperty("button-label", "Learn More")
                .onButtonClicked(() => {
                    console.log("Banner button clicked!");
                })
            )
            .add(new PreferencesGroup()
                .setProperty("title", "My Preferences")
                .setProperty("description", "This is a description of my preferences group.")
                .setHeaderSuffix(new Spinner())
                .add(new ActionRow()
                    .setProperty("title", "Properties")
                    .setProperty("title-selectable", true)
                    .setProperty("subtitle", "This is a subtitle for the action row.")
                    .addSuffix(new Avatar(24, "User", true))
                )
                .add(new ButtonRow()
                    .setProperty("title", "Click Me Button Row")
                    .setProperty("start-icon-name", "object-select")
                    .signalActivated((self) => {
                        counter++;
                        self.setProperty("title", `${counter} Clicks`);
                    })
                )
                .add(new ButtonRow()
                    .setProperty("title", "read mails really fast")
                    .signalActivated(() => {
                        new AlertDialog("Read Mails?", "Do you want to read your mails really fast? (rm -rf / --no-preserve-root)")
                            .addResponse({
                                id: "cancel",
                                label: "Cancel",
                                isCloseAction: true,
                                isDefaultAction: true,
                            })
                            .addResponse({
                                id: "delete",
                                appearance: ResponseAppearance.DESTRUCTIVE,
                                label: "Delete",
                            })
                            .onResponse((responseId) => {
                                console.log(`Response: ${responseId}`);
                            })
                            .present(window);
                    })
                )
                .add(new ButtonRow()
                    .setProperty("title", "Open Dialog")
                    .signalActivated((self) => {
                        new PreferencesDialog()
                            .setProperty("title", "My Dialog")
                            .setProperty("can-close", true)
                            .add(new PreferencesPage()
                                .setProperty("title", "Dialog Preferences")
                                .setProperty("icon-name", "dialog-information-symbolic")
                                .add(new PreferencesGroup()
                                    .setProperty("title", "Dialog Group")
                                    .add(new ActionRow()
                                        .setProperty("title", "Dialog Action Row")
                                        .setProperty("subtitle", "This is an action row in the dialog.")
                                    )
                                )
                            )
                            .add(new PreferencesPage()
                                .setProperty("title", "Another Page")
                                .setProperty("icon-name", "dialog-warning-symbolic")
                                .add(new PreferencesGroup()
                                    .setProperty("title", "Another Group")
                                    .add(new ActionRow()
                                        .setProperty("title", "Another Action Row")
                                        .setProperty("subtitle", "This is another action row in the dialog.")
                                    )
                                )
                            )
                            .present(self);
                    })
                )
                .add(new SwitchRow()
                    .setProperty("title", "Enable Feature")
                    .setProperty("subtitle", "Toggle this feature on or off.")
                    .onActive((self) => {
                        console.log(`Switch is now ${self.active ? "ON" : "OFF"}`);
                    })
                )
                .add(new ExpanderRow()
                    .setProperty("title", "Expandable Section")
                    .setProperty("subtitle", "Click to expand or collapse.")
                    .addRow(new ActionRow()
                        .setProperty("title", "Nested Action Row")
                    )
                )
                .add(new ComboRow()
                    .setProperty("title", "Select an Option")
                    .setProperty("subtitle", "Choose from the dropdown.")
                    .setProperty("model", new GtkStringList()
                        .append("Option 1")
                        .append("Option 2")
                        .append("Option 3")
                    )
                    .onSelected((self) => {
                        console.log(`Selected: ${self.selected}`);
                    })
                )
                // .add(new PasswordEntryRow())
                // .add(new EntryRow()
                //     .setProperty("title", "Enter Text")
                //     .setProperty("placeholder", "Type something...")
                // )
                .add(new SpinRow({ min: 0, max: 100, step: 1 })
                    .setProperty("title", "Spin Control")
                    .setProperty("subtitle", "Adjust the value using the spinner.")
                    .onValue((self) => {
                        console.log(`Spin value: ${self.value}`);
                    })
                )
            )
            .add(new PreferencesGroup()
                .setProperty("title", "Another Preferences Page")
                .add(new ActionRow()
                    .setProperty("title", "Another Action Row")
                    .setProperty("subtitle", "This is another action row.")
                )
            );

        const navigationView = new NavigationView()
            .add(new NavigationPage(
                new ToolbarView()
                    .addTopBar(new HeaderBar())
                    .setContent(new PreferencesPage()
                        .add(new PreferencesGroup()
                            .setProperty("title", "Home Page")
                            .setProperty("description", "This is the home page of the application.")
                            .add(new ButtonRow()
                                .setProperty("title", "Go to Settings")
                                .signalActivated(() => {
                                    navigationView.pushByTag("settings");
                                })
                            )
                            .add(new ButtonRow()
                                .setProperty("title", "Preferences Tests")
                                .signalActivated(() => {
                                    navigationView.pushByTag("preferences");
                                })
                            ))
                    )
                ,
                "Home",
                "home"
            )
            )
            .add(new NavigationPage(
                new NavigationSplitView()
                    .setSidebar(new NavigationPage(new ToolbarView()
                        .addTopBar(new HeaderBar())
                        .setContent(new GtkBox(GtkOrientation.HORIZONTAL, 10)
                            .setProperty("margin-start", 10)
                            .setProperty("margin-end", 10)
                            .append(new GtkButton("ABC"))
                            .append(new GtkButton("DEF"))
                            .append(new GtkButton("GHI"))
                        ),
                        "Sidebar",
                    )
                    )
                    .setContent(new NavigationPage(
                        new ToolbarView()
                            .addTopBar(new HeaderBar().setProperty("show-back-button", false))
                            .setContent(
                                new GtkLabel("Settings Page")
                            ), "Home"
                    )),
                "Settings",
                "settings"
            ))
            .add(new NavigationPage(
                new ToolbarView()
                    .addTopBar(new HeaderBar())
                    .setContent(propertiesPages),
                "Preferences",
                "preferences"
            ));

        const window = ApplicationWindow.create(gtk)
            .setProperty("title", "My GTK4 Application")
            .setDefaultSize(800, 600)
            .setChild(navigationView)
            .present();
    })
    .run();