import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Dashboard';

  wedgetCategories: any = [
    {
      categoryId: 1,
      categoryName: 'CSPM Executive Dashboard',
      widgets: [
        {
          widgetId: 101,
          widgetName: 'Cloud Accounts',
          widgetText:
            'Cloud AccountsCloud AccountsCloud AccountsCloud AccountsCloud Accounts',
        },
        {
          widgetId: 102,
          widgetName: 'Cloud Account Risk Assessment',
          widgetText:
            'Cloud Account Risk AssessmentCloud Account Risk Assessment',
        },
      ],
    },
    {
      categoryId: 2,
      categoryName: 'CWPP Dashboard',
      widgets: [
        {
          widgetId: 201,
          widgetName: 'Top 5 Namespace Specific Alerts',
          widgetText:
            'Top 5 Namespace Specific AlertsTop 5 Namespace Specific Alerts',
        },
        {
          widgetId: 202,
          widgetName: 'Workload Alerts',
          widgetText: 'Workload AlertsWorkload AlertsWorkload Alerts',
        },
      ],
    },
    {
      categoryId: 3,
      categoryName: 'Registry Scan',
      widgets: [
        {
          widgetId: 301,
          widgetName: 'Image Risk Assessment',
          widgetText: 'Image Risk AssessmentImage Risk Assessment',
        },
        {
          widgetId: 302,
          widgetName: 'Image Security Issues',
          widgetText: 'Image Security IssuesImage Security Issues',
        },
      ],
    },
  ];
  mainWedgetCatregoriesobj: any ={};
  newWidgetName: string = '';
  newWidgetText: string = '';
  searchTerm: string = '';  
  tempSelections: { [key: number]: boolean } = {};

  ngOnInit(): void {
      this.mainWedgetCatregoriesobj = JSON.parse(JSON.stringify(this.wedgetCategories))
  }
  addWidget(categoryId: number) {
    const category = this.wedgetCategories.find(
      (cat: any) => cat.categoryId === categoryId
    );
    if (category) {
      const newWidget = {
        widgetId: new Date().getTime(),
        widgetName: this.newWidgetName,
        widgetText: this.newWidgetText,
      };
      category.widgets.push(newWidget);

      this.newWidgetName = '';
      this.newWidgetText = '';
    }
  }

  removeWidget(categoryId: number, widgetId: number) {
    const category = this.mainWedgetCatregoriesobj.find(
      (cat: any) => cat.categoryId === categoryId
    );
    if (category) {
      category.widgets = category.widgets.filter(
        (widget: any) => widget.widgetId !== widgetId
      );
      if (this.tempSelections[widgetId]) {
        this.tempSelections[widgetId] = false;
      }
    }
}
  getFilteredWidgets(widgets: any[]) {
    if (!this.searchTerm) {
      return widgets;
    }
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    return widgets.filter(widget =>
      widget.widgetName.toLowerCase().includes(lowerCaseSearchTerm) ||
      widget.widgetText.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }

  toggleWidgetSelection(widgetId: number, event: Event) {
   
    const target = event.target as HTMLInputElement;
    if (target) {
      this.tempSelections[widgetId] = target.checked;
    }
  }

  confirmSelectionChanges(categoryId: number) {
    this.mainWedgetCatregoriesobj = JSON.parse(JSON.stringify(this.wedgetCategories));

    const mainCategory = this.mainWedgetCatregoriesobj.find((cat: any) => cat.categoryId === categoryId);
    const category = this.wedgetCategories.find((cat: any) => cat.categoryId === categoryId);

    if (mainCategory && category) {
        for (const [widgetId, isChecked] of Object.entries(this.tempSelections)) {
            const widgetIdNumber = +widgetId;
            if (isChecked) {
                let widget = mainCategory.widgets.find((w: any) => w.widgetId === widgetIdNumber);

                if (!widget) {
                    widget = category.widgets.find((w: any) => w.widgetId === widgetIdNumber);
                    if (widget) {
                        mainCategory.widgets.push(widget);
                    }
                }
            } else {
                mainCategory.widgets = mainCategory.widgets.filter((w: any) => w.widgetId !== widgetIdNumber);
            }
        }
        this.tempSelections = {};
    }
}




}
