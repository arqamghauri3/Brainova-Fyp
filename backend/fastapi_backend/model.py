import torch.nn as nn
import torch.nn.functional as F

class CNNGRU_Model(nn.Module):
    def __init__(self,chan_total,signal_length):
        super(CNNGRU_Model,self).__init__()

        self.conv1=nn.Conv1d(in_channels=chan_total,out_channels=32,kernel_size=3,stride=1,padding=0)
        self.pool=nn.MaxPool1d(kernel_size=3,stride=2)
        self.conv2=nn.Conv1d(in_channels=32,out_channels=64,kernel_size=3,stride=1,padding=0)
        self.gru=nn.GRU(input_size=64,hidden_size=35,batch_first=True)
        self.time_distributed = nn.Linear(35, 35)
        self.global_pool=nn.AdaptiveAvgPool1d(1)
        self.fc=nn.Linear(35,2)
        self.dropout = nn.Dropout(0.5)

    def forward(self,x):
        x=self.conv1(x)
        x=self.pool(x)
        x=F.relu(x)
        x=self.dropout(x)

        x=self.conv2(x)
        x=self.pool(x)
        x=F.relu(x)
        x=self.dropout(x)


        x=x.permute(0,2,1)
        x,_=self.gru(x)
        x = self.time_distributed(x)
        x = F.relu(x)

        x=x.permute(0,2,1)
        x=self.global_pool(x)
        x = x.squeeze(2)
        x=self.fc(x)
        return x

